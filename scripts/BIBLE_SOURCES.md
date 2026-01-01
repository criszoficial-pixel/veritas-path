# Fuentes de Texto Bíblico

## Reina Valera 1960 (RV1960) - Para Ministerios

### Solicitar Licencia

La **Reina Valera 1960** está protegida por copyright de las **Sociedades Bíblicas Unidas**. Para uso ministerial sin fines de lucro, normalmente se otorgan licencias gratuitas o muy accesibles.

#### Contactos por País:

| País | Sociedad Bíblica | Contacto |
|------|------------------|----------|
| México | Sociedades Bíblicas Unidas | [sbu.org.mx](https://www.sbu.org.mx) |
| Argentina | Sociedad Bíblica Argentina | [sociedadbiblica.org.ar](https://www.sociedadbiblica.org.ar) |
| Colombia | Sociedad Bíblica Colombiana | [sociedadbiblica.org.co](https://www.sociedadbiblica.org.co) |
| España | Sociedad Bíblica España | [sociedadbiblica.org](https://www.sociedadbiblica.org) |
| EE.UU. | American Bible Society | [americanbible.org](https://www.americanbible.org) |

#### Información a Proporcionar:

1. Nombre del ministerio/iglesia
2. Propósito de la aplicación
3. Confirmación de uso sin fines de lucro
4. Cómo se mostrará la atribución de copyright

---

## APIs con Licencia Incluida

### Bible.API.Bible (American Bible Society)

- **URL**: [scripture.api.bible](https://scripture.api.bible)
- **Incluye**: RV1960, NVI, RVC, y más de 2500 versiones
- **Licencia**: Gratuita para apps con registro
- **Límites**: 5,000 solicitudes/día (plan gratuito)

```javascript
// Ejemplo de uso
const response = await fetch(
  'https://api.scripture.api.bible/v1/bibles/RV1960/chapters/GEN.1',
  { headers: { 'api-key': 'YOUR_API_KEY' } }
);
```

### GetBible.net

- **URL**: [getbible.net](https://getbible.net)
- **Incluye**: Múltiples versiones en español
- **Licencia**: Gratuita, verificar términos por versión

---

## Versiones de Dominio Público

Estas versiones pueden usarse libremente sin solicitar licencia:

### Español

| Versión | Año | Notas |
|---------|-----|-------|
| Reina Valera 1909 | 1909 | Dominio público |
| Reina Valera Antigua | 1865 | Dominio público |
| Sagradas Escrituras (1569) | 1569 | Dominio público |

### Inglés

| Versión | Año | Notas |
|---------|-----|-------|
| King James Version (KJV) | 1611 | Dominio público |
| American Standard Version | 1901 | Dominio público |
| World English Bible (WEB) | Moderno | Dominio público |

---

## Formato de Archivo Esperado

### Texto Plano

```
Génesis 1:1 En el principio creó Dios los cielos y la tierra.
Génesis 1:2 Y la tierra estaba desordenada y vacía...
```

### USFM (Formato Universal)

```
\id GEN
\c 1
\v 1 En el principio creó Dios los cielos y la tierra.
\v 2 Y la tierra estaba desordenada y vacía...
```

---

## Comando de Importación

```bash
# Importar texto en español
python scripts/import_bible_text.py \
  --input /ruta/rv1960.txt \
  --lang es \
  --format plain \
  --version RV1960

# Importar USFM en inglés
python scripts/import_bible_text.py \
  --input /ruta/kjv.usfm \
  --lang en \
  --format usfm \
  --version KJV
```

---

## Atribución Requerida para RV1960

Cuando obtengas la licencia, incluir en la app:

```
Reina Valera 1960 © Sociedades Bíblicas Unidas
Usada con permiso
```

Esta atribución ya está incluida en el archivo `metadata.json`.
