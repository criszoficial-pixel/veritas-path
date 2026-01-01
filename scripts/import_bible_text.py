#!/usr/bin/env python3
"""
Bible Text Importer

Converts Bible text files to JSON format for the app.
Supports plain text and USFM formats.

Usage:
    python import_bible_text.py --input /path/to/bible.txt --lang es --format plain
"""

import json
import os
import re
import argparse
from pathlib import Path
from typing import Dict, List, Optional


class BibleImporter:
    """Converts Bible text files to JSON structure for the app."""
    
    # Book slugs for URL-friendly names
    BOOK_SLUGS_ES = {
        "Génesis": "genesis",
        "Éxodo": "exodo",
        "Levítico": "levitico",
        "Números": "numeros",
        "Deuteronomio": "deuteronomio",
        "Josué": "josue",
        "Jueces": "jueces",
        "Rut": "rut",
        "1 Samuel": "1-samuel",
        "2 Samuel": "2-samuel",
        "1 Reyes": "1-reyes",
        "2 Reyes": "2-reyes",
        "1 Crónicas": "1-cronicas",
        "2 Crónicas": "2-cronicas",
        "Esdras": "esdras",
        "Nehemías": "nehemias",
        "Ester": "ester",
        "Job": "job",
        "Salmos": "salmos",
        "Proverbios": "proverbios",
        "Eclesiastés": "eclesiastes",
        "Cantares": "cantares",
        "Isaías": "isaias",
        "Jeremías": "jeremias",
        "Lamentaciones": "lamentaciones",
        "Ezequiel": "ezequiel",
        "Daniel": "daniel",
        "Oseas": "oseas",
        "Joel": "joel",
        "Amós": "amos",
        "Abdías": "abdias",
        "Jonás": "jonas",
        "Miqueas": "miqueas",
        "Nahúm": "nahum",
        "Habacuc": "habacuc",
        "Sofonías": "sofonias",
        "Hageo": "hageo",
        "Zacarías": "zacarias",
        "Malaquías": "malaquias",
        "Mateo": "mateo",
        "Marcos": "marcos",
        "Lucas": "lucas",
        "Juan": "juan",
        "Hechos": "hechos",
        "Romanos": "romanos",
        "1 Corintios": "1-corintios",
        "2 Corintios": "2-corintios",
        "Gálatas": "galatas",
        "Efesios": "efesios",
        "Filipenses": "filipenses",
        "Colosenses": "colosenses",
        "1 Tesalonicenses": "1-tesalonicenses",
        "2 Tesalonicenses": "2-tesalonicenses",
        "1 Timoteo": "1-timoteo",
        "2 Timoteo": "2-timoteo",
        "Tito": "tito",
        "Filemón": "filemon",
        "Hebreos": "hebreos",
        "Santiago": "santiago",
        "1 Pedro": "1-pedro",
        "2 Pedro": "2-pedro",
        "1 Juan": "1-juan",
        "2 Juan": "2-juan",
        "3 Juan": "3-juan",
        "Judas": "judas",
        "Apocalipsis": "apocalipsis",
    }
    
    def __init__(self, output_dir: str, language: str = "es", version: str = "RV1960"):
        self.output_dir = Path(output_dir)
        self.language = language
        self.version = version
        self.book_slugs = self.BOOK_SLUGS_ES if language == "es" else {}
        
    def get_slug(self, book_name: str) -> str:
        """Get URL-friendly slug for book name."""
        if book_name in self.book_slugs:
            return self.book_slugs[book_name]
        # Generate slug from name
        slug = book_name.lower()
        slug = re.sub(r'[áàäâ]', 'a', slug)
        slug = re.sub(r'[éèëê]', 'e', slug)
        slug = re.sub(r'[íìïî]', 'i', slug)
        slug = re.sub(r'[óòöô]', 'o', slug)
        slug = re.sub(r'[úùüû]', 'u', slug)
        slug = re.sub(r'[ñ]', 'n', slug)
        slug = re.sub(r'\s+', '-', slug)
        return slug
    
    def parse_plain_text(self, content: str) -> Dict[str, Dict[int, List[Dict]]]:
        """
        Parse plain text Bible format.
        Expected format:
            BookName Chapter:Verse Text
            e.g., "Génesis 1:1 En el principio creó Dios los cielos y la tierra."
        """
        books: Dict[str, Dict[int, List[Dict]]] = {}
        
        # Pattern: BookName Chapter:Verse Text
        pattern = r'^(.+?)\s+(\d+):(\d+)\s+(.+)$'
        
        for line in content.split('\n'):
            line = line.strip()
            if not line:
                continue
                
            match = re.match(pattern, line)
            if match:
                book_name = match.group(1).strip()
                chapter = int(match.group(2))
                verse_num = int(match.group(3))
                text = match.group(4).strip()
                
                if book_name not in books:
                    books[book_name] = {}
                if chapter not in books[book_name]:
                    books[book_name][chapter] = []
                    
                books[book_name][chapter].append({
                    "number": verse_num,
                    "text": text
                })
        
        return books
    
    def parse_usfm(self, content: str) -> Dict[str, Dict[int, List[Dict]]]:
        """
        Parse USFM format Bible text.
        Basic USFM markers: \\id, \\c, \\v
        """
        books: Dict[str, Dict[int, List[Dict]]] = {}
        current_book = None
        current_chapter = 0
        
        lines = content.split('\n')
        
        for line in lines:
            line = line.strip()
            
            # Book identifier
            if line.startswith('\\id '):
                # Extract book code
                parts = line.split()
                if len(parts) >= 2:
                    current_book = parts[1]
                    books[current_book] = {}
                    
            # Chapter marker
            elif line.startswith('\\c '):
                parts = line.split()
                if len(parts) >= 2:
                    current_chapter = int(parts[1])
                    if current_book and current_chapter not in books.get(current_book, {}):
                        books[current_book][current_chapter] = []
                        
            # Verse marker
            elif line.startswith('\\v '):
                if current_book and current_chapter > 0:
                    # Remove the \v marker and get verse number and text
                    verse_content = line[3:].strip()
                    match = re.match(r'^(\d+)\s+(.+)$', verse_content)
                    if match:
                        verse_num = int(match.group(1))
                        # Remove other USFM markers from text
                        text = re.sub(r'\\[a-z]+\s*', '', match.group(2))
                        text = text.strip()
                        
                        books[current_book][current_chapter].append({
                            "number": verse_num,
                            "text": text
                        })
        
        return books
    
    def export_to_json(self, books: Dict[str, Dict[int, List[Dict]]]) -> None:
        """Export parsed Bible data to JSON files."""
        lang_dir = self.output_dir / self.language
        lang_dir.mkdir(parents=True, exist_ok=True)
        
        for book_name, chapters in books.items():
            slug = self.get_slug(book_name)
            book_dir = lang_dir / slug
            book_dir.mkdir(parents=True, exist_ok=True)
            
            for chapter_num, verses in chapters.items():
                # Sort verses by number
                verses.sort(key=lambda v: v["number"])
                
                chapter_data = {
                    "book": book_name,
                    "bookSlug": slug,
                    "chapter": chapter_num,
                    "version": self.version,
                    "verses": verses
                }
                
                output_file = book_dir / f"{chapter_num}.json"
                with open(output_file, 'w', encoding='utf-8') as f:
                    json.dump(chapter_data, f, ensure_ascii=False, indent=2)
                    
                print(f"Exported: {book_name} {chapter_num} -> {output_file}")
    
    def import_file(self, input_path: str, format_type: str = "plain") -> None:
        """Import Bible text from file."""
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if format_type == "plain":
            books = self.parse_plain_text(content)
        elif format_type == "usfm":
            books = self.parse_usfm(content)
        else:
            raise ValueError(f"Unsupported format: {format_type}")
        
        self.export_to_json(books)
        print(f"\nImport complete! Files saved to: {self.output_dir / self.language}")


def main():
    parser = argparse.ArgumentParser(description="Import Bible text to JSON format")
    parser.add_argument("--input", "-i", required=True, help="Input file path")
    parser.add_argument("--output", "-o", default="public/bible", help="Output directory")
    parser.add_argument("--lang", "-l", default="es", help="Language code (es, en)")
    parser.add_argument("--format", "-f", default="plain", choices=["plain", "usfm"], help="Input format")
    parser.add_argument("--version", "-v", default="RV1960", help="Bible version name")
    
    args = parser.parse_args()
    
    importer = BibleImporter(args.output, args.lang, args.version)
    importer.import_file(args.input, args.format)


if __name__ == "__main__":
    main()
