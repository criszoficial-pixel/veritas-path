export type ImageTheme = 'divine' | 'sunrise' | 'night' | 'nature' | 'minimal';
export type ImageFormat = 'square' | 'story' | 'wide';

export interface VerseImageOptions {
  verse: string;
  reference: string;
  theme: ImageTheme;
  format: ImageFormat;
}

interface ThemeConfig {
  backgroundGradient: string[];
  textColor: string;
  accentColor: string;
  secondaryColor: string;
}

const themes: Record<ImageTheme, ThemeConfig> = {
  divine: {
    backgroundGradient: ['#1e3a5f', '#0f1f33'],
    textColor: '#f5f1e8',
    accentColor: '#d4a84b',
    secondaryColor: 'rgba(255, 255, 255, 0.6)',
  },
  sunrise: {
    backgroundGradient: ['#fef6e4', '#f0e6c8'],
    textColor: '#1a202c',
    accentColor: '#d4a84b',
    secondaryColor: 'rgba(26, 32, 44, 0.6)',
  },
  night: {
    backgroundGradient: ['#1a1a2e', '#0f0f23'],
    textColor: '#e2e8f0',
    accentColor: '#a78bfa',
    secondaryColor: 'rgba(226, 232, 240, 0.6)',
  },
  nature: {
    backgroundGradient: ['#134e5e', '#71b280'],
    textColor: '#ffffff',
    accentColor: '#fef08a',
    secondaryColor: 'rgba(255, 255, 255, 0.7)',
  },
  minimal: {
    backgroundGradient: ['#ffffff', '#f8f9fa'],
    textColor: '#1a202c',
    accentColor: '#1e3a5f',
    secondaryColor: 'rgba(26, 32, 44, 0.5)',
  },
};

const formats: Record<ImageFormat, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  story: { width: 1080, height: 1920 },
  wide: { width: 1200, height: 630 },
};

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function drawGradientBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: string[]
) {
  const gradient = ctx.createLinearGradient(0, 0, width * 0.5, height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawDecorations(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  theme: ThemeConfig
) {
  ctx.strokeStyle = theme.accentColor;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.3;

  // Top decorative line
  const lineWidth = Math.min(width * 0.4, 200);
  const centerX = width / 2;
  const topY = height * 0.15;
  
  ctx.beginPath();
  ctx.moveTo(centerX - lineWidth / 2, topY);
  ctx.lineTo(centerX + lineWidth / 2, topY);
  ctx.stroke();

  // Small diamond at center of line
  const diamondSize = 8;
  ctx.beginPath();
  ctx.moveTo(centerX, topY - diamondSize);
  ctx.lineTo(centerX + diamondSize, topY);
  ctx.lineTo(centerX, topY + diamondSize);
  ctx.lineTo(centerX - diamondSize, topY);
  ctx.closePath();
  ctx.fillStyle = theme.accentColor;
  ctx.fill();

  // Bottom decorative line
  const bottomY = height * 0.85;
  ctx.beginPath();
  ctx.moveTo(centerX - lineWidth / 2, bottomY);
  ctx.lineTo(centerX + lineWidth / 2, bottomY);
  ctx.stroke();

  // Corner decorations
  ctx.globalAlpha = 0.15;
  const cornerSize = 60;
  
  // Top left
  ctx.beginPath();
  ctx.moveTo(40, 40);
  ctx.lineTo(40 + cornerSize, 40);
  ctx.moveTo(40, 40);
  ctx.lineTo(40, 40 + cornerSize);
  ctx.stroke();

  // Top right
  ctx.beginPath();
  ctx.moveTo(width - 40, 40);
  ctx.lineTo(width - 40 - cornerSize, 40);
  ctx.moveTo(width - 40, 40);
  ctx.lineTo(width - 40, 40 + cornerSize);
  ctx.stroke();

  // Bottom left
  ctx.beginPath();
  ctx.moveTo(40, height - 40);
  ctx.lineTo(40 + cornerSize, height - 40);
  ctx.moveTo(40, height - 40);
  ctx.lineTo(40, height - 40 - cornerSize);
  ctx.stroke();

  // Bottom right
  ctx.beginPath();
  ctx.moveTo(width - 40, height - 40);
  ctx.lineTo(width - 40 - cornerSize, height - 40);
  ctx.moveTo(width - 40, height - 40);
  ctx.lineTo(width - 40, height - 40 - cornerSize);
  ctx.stroke();

  ctx.globalAlpha = 1;
}

export async function generateVerseImage(options: VerseImageOptions): Promise<Blob> {
  const { verse, reference, theme, format } = options;
  const themeConfig = themes[theme];
  const { width, height } = formats[format];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // Draw background
  drawGradientBackground(ctx, width, height, themeConfig.backgroundGradient);

  // Draw decorations (except minimal theme)
  if (theme !== 'minimal') {
    drawDecorations(ctx, width, height, themeConfig);
  }

  // Calculate font sizes based on format
  const baseFontSize = format === 'story' ? 48 : format === 'wide' ? 36 : 42;
  const refFontSize = format === 'story' ? 28 : format === 'wide' ? 22 : 24;
  const watermarkSize = format === 'story' ? 20 : 16;

  // Draw verse text
  ctx.font = `italic ${baseFontSize}px 'Crimson Text', Georgia, serif`;
  ctx.fillStyle = themeConfig.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const padding = width * 0.12;
  const maxTextWidth = width - padding * 2;
  const lines = wrapText(ctx, `"${verse}"`, maxTextWidth);
  
  const lineHeight = baseFontSize * 1.5;
  const totalTextHeight = lines.length * lineHeight;
  const startY = (height - totalTextHeight) / 2 - refFontSize;

  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });

  // Draw reference
  ctx.font = `600 ${refFontSize}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillStyle = themeConfig.accentColor;
  const refY = startY + totalTextHeight + refFontSize * 1.5;
  ctx.fillText(`— ${reference}`, width / 2, refY);

  // Draw watermark
  ctx.font = `500 ${watermarkSize}px 'Plus Jakarta Sans', sans-serif`;
  ctx.fillStyle = themeConfig.secondaryColor;
  ctx.textAlign = 'right';
  ctx.fillText('Shalom', width - 40, height - 40);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate image'));
        }
      },
      'image/png',
      1.0
    );
  });
}

export function getThemePreviewColors(theme: ImageTheme): { bg: string; text: string; accent: string } {
  const config = themes[theme];
  return {
    bg: config.backgroundGradient[0],
    text: config.textColor,
    accent: config.accentColor,
  };
}
