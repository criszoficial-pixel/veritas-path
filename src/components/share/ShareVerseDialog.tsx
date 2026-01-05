import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Share2, Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { generateVerseImage, type ImageTheme, type ImageFormat } from '@/services/verseImageService';
import { ThemeSelector } from './ThemeSelector';
import { FormatSelector } from './FormatSelector';

interface ShareVerseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  verse: string;
  reference: string;
}

export const ShareVerseDialog = ({ isOpen, onClose, verse, reference }: ShareVerseDialogProps) => {
  const [theme, setTheme] = useState<ImageTheme>('divine');
  const [format, setFormat] = useState<ImageFormat>('square');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<string | null>(null);

  // Generate preview when options change
  useEffect(() => {
    if (!isOpen) return;

    const generatePreview = async () => {
      setIsGenerating(true);
      try {
        const blob = await generateVerseImage({ verse, reference, theme, format });
        
        // Revoke previous URL
        if (previewRef.current) {
          URL.revokeObjectURL(previewRef.current);
        }
        
        const url = URL.createObjectURL(blob);
        previewRef.current = url;
        setPreviewUrl(url);
      } catch (error) {
        console.error('Error generating preview:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    generatePreview();
  }, [isOpen, verse, reference, theme, format]);

  // Cleanup URL on unmount
  useEffect(() => {
    return () => {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
      }
    };
  }, []);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const blob = await generateVerseImage({ verse, reference, theme, format });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `versiculo-${reference.replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Imagen descargada');
    } catch (error) {
      toast.error('Error al descargar la imagen');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsGenerating(true);
      const blob = await generateVerseImage({ verse, reference, theme, format });
      const file = new File([blob], 'versiculo.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: reference,
          text: `"${verse}" — ${reference}`,
        });
      } else {
        // Fallback to download
        handleDownload();
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Error al compartir');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      setIsGenerating(true);
      const blob = await generateVerseImage({ verse, reference, theme, format });
      
      if (navigator.clipboard && 'write' in navigator.clipboard) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        toast.success('Imagen copiada al portapapeles');
      } else {
        toast.error('Tu navegador no soporta copiar imágenes');
      }
    } catch (error) {
      toast.error('Error al copiar la imagen');
    } finally {
      setIsGenerating(false);
    }
  };

  const getPreviewAspectClass = () => {
    switch (format) {
      case 'story': return 'aspect-[9/16] max-h-[400px]';
      case 'wide': return 'aspect-[1200/630]';
      default: return 'aspect-square';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compartir como imagen</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div className={`relative w-full ${getPreviewAspectClass()} mx-auto overflow-hidden rounded-lg border border-border bg-muted`}>
            {isGenerating && !previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            )}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Vista previa"
                className="w-full h-full object-contain"
              />
            )}
            {isGenerating && previewUrl && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-foreground" />
              </div>
            )}
          </div>

          {/* Theme Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tema</label>
            <ThemeSelector selected={theme} onSelect={setTheme} />
          </div>

          {/* Format Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Formato</label>
            <FormatSelector selected={format} onSelect={setFormat} />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopy}
              disabled={isGenerating}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDownload}
              disabled={isGenerating}
            >
              <Download className="h-4 w-4 mr-2" />
              Descargar
            </Button>
            <Button
              className="flex-1"
              onClick={handleShare}
              disabled={isGenerating}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
