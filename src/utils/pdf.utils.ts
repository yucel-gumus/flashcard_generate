/**
 * @fileoverview Flashcard PDF oluşturma ve doğrudan indirme utility fonksiyonu
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Flashcard } from '../types/flashcard.types';

/**
 * Flashcard listesini stüdyo kalitesinde profesyonel bir PDF dosyası olarak doğrudan bilgisayara indirir.
 * 60-30-10 tasarım prensiplerine uygun, 2 sütunlu şık ders kartları şablonu içerir.
 * 
 * @param flashcards İndirilecek flashcard listesi
 * @param topic Konu başlığı
 */
export async function downloadFlashcardsAsPdf(
    flashcards: Flashcard[],
    topic: string = 'Bilgi Kartları'
): Promise<void> {
    if (!flashcards || flashcards.length === 0) return;

    // Şık ve gizli PDF şablonu container'ı oluştur
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '-9999px';
    pdfContainer.style.width = '850px';
    pdfContainer.style.backgroundColor = '#FFEBD3';
    pdfContainer.style.color = '#7A2417';
    pdfContainer.style.fontFamily = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, Arial, sans-serif";
    pdfContainer.style.padding = '44px';
    pdfContainer.style.boxSizing = 'border-box';

    const formattedDate = new Date().toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // 2 Sütunlu Yan Yana Şık Kart Izgarası Şablonu
    pdfContainer.innerHTML = `
        <!-- Hero Header Box -->
        <div style="background-color: #FFB6A6; border: 4px solid #C85846; border-radius: 20px; padding: 28px 32px; margin-bottom: 32px; box-shadow: 0 10px 25px rgba(122, 36, 23, 0.15);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <div style="display: inline-flex; align-items: center; gap: 6px; background-color: #3F7E71; color: #ffffff; font-size: 11px; font-weight: 800; padding: 5px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(63, 126, 113, 0.3);">
                        ⚡ KENSAI
                    </div>
                    <h1 style="font-size: 32px; font-weight: 800; color: #7A2417; margin: 0 0 6px 0; letter-spacing: -0.5px; line-height: 1.2;">
                        ${escapeHtml(topic)}
                    </h1>
                    <p style="font-size: 14px; font-weight: 700; color: #C85846; margin: 0;">
                        Yapay Zeka Destekli Özel Öğrenme & Çalışma Kartları
                    </p>
                </div>
                <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                    <span style="font-size: 13px; font-weight: 800; color: #7A2417; background-color: #FFEBD3; padding: 4px 12px; border-radius: 8px; border: 2px solid #C85846;">
                        📅 ${formattedDate}
                    </span>
                    <span style="background-color: #C85846; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(200, 88, 70, 0.3);">
                        ${flashcards.length} ADET KART
                    </span>
                </div>
            </div>
        </div>

        <!-- 2 Column Flashcards Grid -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            ${flashcards
            .map(
                (card, index) => `
                <div style="background-color: #FFEBD3; border: 3px solid #C85846; border-radius: 18px; overflow: hidden; page-break-inside: avoid; break-inside: avoid; display: flex; flex-direction: column; box-shadow: 0 6px 16px rgba(122, 36, 23, 0.12);">
                    
                    <!-- Card Top Number Banner -->
                    <div style="background-color: #C85846; color: #ffffff; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; font-weight: 800; letter-spacing: 1px;">KART #${(index + 1).toString().padStart(2, '0')}</span>
                        <span style="font-size: 11px; font-weight: 700; opacity: 0.9;">Bilgi Kartı</span>
                    </div>

                    <!-- Question Section (Soru) -->
                    <div style="background-color: #FFB6A6; padding: 18px; border-bottom: 3px solid #C85846; flex-grow: 1;">
                        <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #C85846; letter-spacing: 1px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                            📌 SORU / TERİM
                        </div>
                        <div style="font-size: 16px; font-weight: 800; color: #7A2417; line-height: 1.35; word-break: break-word;">
                            ${escapeHtml(card.term)}
                        </div>
                    </div>

                    <!-- Answer Section (Cevap) -->
                    <div style="background-color: #9BCEC1; padding: 18px; flex-grow: 1;">
                        <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #1E4D43; letter-spacing: 1px; margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">
                            💡 CEVAP / TANIM
                        </div>
                        <div style="font-size: 14px; font-weight: 700; color: #1E4D43; line-height: 1.45; word-break: break-word;">
                            ${escapeHtml(card.definition)}
                        </div>
                    </div>
                </div>
            `
            )
            .join('')}
        </div>
    `;

    document.body.appendChild(pdfContainer);

    try {
        const canvas = await html2canvas(pdfContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#FFEBD3',
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        // Doğrudan .pdf olarak indir
        const sanitizedTopic = topic.toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi, '_');
        const filename = `bilgi_kartlari_${sanitizedTopic || 'set'}.pdf`;
        pdf.save(filename);
    } finally {
        if (document.body.contains(pdfContainer)) {
            document.body.removeChild(pdfContainer);
        }
    }
}

/** HTML Özel karakterlerini escape eder */
function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
