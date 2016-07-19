package parse

import (
	"fmt"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// Parser : construct to parse the RBI page
type Parser struct {
	page   string
	parsed string
}

// Get  : get the parsed URL from the RBI page
func (p *Parser) Get() error {
	// Setup default URLs
	p.page = "https://www.rbi.org.in/scripts/neft.aspx"

	doc, err := goquery.NewDocument(p.page)
	if err != nil {
		return err
	}

	// Find all items with .Link2
	doc.Find(".Link2").Each(func(i int, s *goquery.Selection) {
		// Find if the title contains Consolidated
		// List of NEFT enabled bank branches (Consolidated IFS Codes) (as on July 15, 2016)
		title := s.Text()
		title = strings.TrimSpace(title)
		if strings.Contains(title, "Consolidated") {
			link, exists := s.Attr("href")
			if exists {
				fmt.Println(link)
				p.parsed = link
			}
		}
	})

	return nil
}
