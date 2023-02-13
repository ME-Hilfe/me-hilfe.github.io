import { PDFDocument, StandardFonts } from "pdf-lib";

async function createPdf(formData) {
  const doc = await PDFDocument.create();

  // const helvetica = await doc.embedFont(StandardFonts.Helvetica)
  // const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold)

  const page = doc.addPage();

  const { width, height } = page.getSize();

  const headlineFontSize = 25;

  page.drawText("Aufnahmeantrag in den Verein ME Hilfe", {
    x: 50,
    y: height - 2 * headlineFontSize,
    //font: helveticaBold,
    size: headlineFontSize,
  });

  const form = doc.getForm();

  const formLeftOffset = 200;
  const formWidth = width - formLeftOffset - 50;

  const x = 50;
  const start_y = 700;

  for (const [index, [fieldId, fieldLabel]] of [
    ["name", "Name, Vorname:"],
    ["birthdate", "Geburtsdatum:"],
    ["address", "Straße:"],
    ["zip", "PLZ / Wohnort:"],
    ["phone", "Telefon:"],
    ["email", "E-Mail:"],
    ["social", "Social-Media:"],
  ].entries()) {
    const y = start_y - index * 30;

    page.drawText(fieldLabel, { x: x, y: y + 4, size: 18 });
    form
      .createTextField(fieldId)
      .addToPage(page, { x: x + 170, y: y, height: 20, width: formWidth });
    console.log("fieldId, fieldLabel", index, fieldId, fieldLabel, { y });
  }

  // fill data
  form.getTextField("name").setText(formData['name'])
  form.getTextField("birthdate").setText(formData['birthdate'])
  form.getTextField("address").setText(formData['address'])
  form.getTextField("zip").setText(formData['zip'])
  form.getTextField("phone").setText(formData['phone'])
  form.getTextField("email").setText(formData['email'])
  form.getTextField("social").setText(formData['social'])
  
  
  let y = 470;
  page.drawText("Die Aufnahme in den Verein soll erfolgen ab:", {
    x: 50,
    y: y + 4,
    size: 18,
  });
  form
    .createTextField("join_date")
    .addToPage(page, { x: x + 370, y: y, height: 20, width: formWidth - 200 });

  y -= 30;
  page.drawText("Der Monatsbeitrag beträgt derzeit 8 Euro.", {
    x: 50,
    y: y + 4,
    size: 18,
  });
  y -= 20;
  page.drawText(
    "(Der Mitgliedsbeitrag kann bei jeder ordentlichen Mitgliederversammlung angepasst werden.)",
    { x: 50, y: y + 4, size: 12 }
  );

  y -= 40;
  page.drawText("Ich habe die Vereinssatzung mit Fassung vom 21.01.2023 mit", {
    x: 50,
    y: y + 4,
    size: 18,
  });
  y -= 20;
  page.drawText("allen Rechten und Pflichten zur Kenntnis genommen.", {
    x: 50,
    y: y + 4,
    size: 18,
  });

  y -= 70;

  page.drawLine({
    start: { x: 50, y: y },
    end: { x: 250, y: y },
  });

  y -= 15;
  page.drawText("Ort, Datum", { x: 50, y: y + 4, size: 12 });
  page.drawText("Unterschrift", { x: 188, y: y + 4, size: 12 });

  y = 120;
  const box_h = 110;
  page.drawLine({
    start: { x: 50, y: y },
    end: { x: width - 50, y: y },
  });

  page.drawLine({
    start: { x: 50, y: y - box_h },
    end: { x: width - 50, y: y - box_h },
  });

  page.drawLine({
    start: { x: 50, y: y },
    end: { x: 50, y: y - box_h },
  });

  page.drawLine({
    start: { x: width - 50, y: y },
    end: { x: width - 50, y: y - box_h },
  });

  y -= 30;
  page.drawText("Vereinsintern, nur vom Verein auszufüllen.", {
    x: 60,
    y: y + 4,
    size: 12,
  });

  y -= 30;
  page.drawText("Mitgliedsnummer:", { x: 60, y: y + 4, size: 12 });

  y -= 30;
  page.drawText(
    "Mit Beschluss des Vorstandes gemäß Satzung am ___________ aufgenommen.",
    { x: 60, y: y + 4, size: 12 }
  );
  
  return doc.saveAsBase64({ dataUri: true })
}

export default createPdf;
