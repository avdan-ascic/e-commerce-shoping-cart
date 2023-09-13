import ExcelJS from "exceljs";
import sharp from "sharp";

import Book from "../models/book.model";

const seedData = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("./src/data/Books.xlsx");

    const worksheet = workbook.getWorksheet("Books");

    for (let rowIndex = 1; rowIndex <= worksheet.actualRowCount; rowIndex++) {
      const row = worksheet.getRow(rowIndex);

      if (rowIndex === 1) continue;

      const title = row.getCell(1).value;
      const author = row.getCell(2).value;
      const image = row.getCell(3).value;
      const price = row.getCell(4).value;
      const stock = row.getCell(5).value;

      let newBook = new Book({
        title: title,
        author: author,
        price: price,
        stock: stock,
      });

      const imageBuffer = await sharp(
        `./src/data/images/books/${image}.jpg`
      ).toBuffer();

      Object.assign(newBook, {
        image: {
          data: imageBuffer,
          contentType: "image/jpg",
        },
      });

      await newBook.save();
    }
  } catch (err) {
    console.log(err);
  }
};

export { seedData };
