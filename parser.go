package main

import (
	"fmt"

	"github.com/extrame/xls"
)

// Parser : Parse the xls file at the RBI server
type Parser struct {
}

// Read the file at the server
func (p *Parser) Read(file string) error {
	// Read the file
	xls, err := xls.Open(file, "utf-8")
	if err != nil {
		return err
	}

	fmt.Println("Author", xls.Author)

	// Read each sheet
	for i := 0; i < xls.NumSheets(); i++ {
		sheet := xls.GetSheet(i)
		fmt.Println("Sheet.Name", sheet.Name)

		// Ignore the first because that's just heading
		for j := 1; j < int(sheet.MaxRow); j++ {
			row := sheet.Rows[uint16(j)]
			name := row.Cols[0]
			ifsc := row.Cols[1]
			micr := row.Cols[2]
			branch := row.Cols[3]
			address := row.Cols[4]
			contact := row.Cols[5]

			fmt.Println("j", j, "name", name.String(xls), "ifsc", ifsc.String(xls), "micr", micr.String(xls), "branch", branch.String(xls), "address", address.String(xls), "contact", contact.String(xls))
		}
	}

	// fmt.Println("xls", xls)
	return nil
}
