package main

import (
	"fmt"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// Find : construct to parse the RBI page
type Find struct {
}

// Get  : get the parsed URL from the RBI page
func (f *Find) Get() (string, error) {
	// Setup default URLs
	pageURL := "https://www.rbi.org.in/scripts/neft.aspx"
	fileURL := ""

	fmt.Println("Trying to get", pageURL)
	doc, err := goquery.NewDocument(pageURL)
	fmt.Println("doc", doc)
	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}

	// Find all items with .Link2
	fmt.Println("Looping through the webpage to find links")
	doc.Find(".Link2").Each(func(i int, s *goquery.Selection) {
		// Find if the title contains Consolidated
		// List of NEFT enabled bank branches (Consolidated IFS Codes) (as on July 15, 2016)
		title := s.Text()
		title = strings.TrimSpace(title)
		if strings.Contains(title, "Consolidated") {
			link, exists := s.Attr("href")
			if exists {
				link = strings.Replace(link, "http://", "https://", 1)
				fileURL = link
			}
		}
	})

	return fileURL, nil
}

// Download : download the latest file from the server if it doesn't exist
func (f *Find) Download(url string, file string) error {

	fmt.Println("About to run curl")
	out, err := Run([]string{"curl", "--show-error", "--progress-bar", "--fail", "--location", url, "--output", file}, "")
	fmt.Println("out", out)
	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	return nil
}
