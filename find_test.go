package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Find(t *testing.T) {
	var f Find
	url, err := f.Get()

	assert.Nil(t, err)
	assert.Equal(t, "https://rbidocs.rbi.org.in/rdocs/content/docs/68774.xls", url)

	err = f.Download("https://rbidocs.rbi.org.in/rdocs/Content/DOCs/IFCB2009_02.xls", "IFCB2009_02.xls")
	assert.Nil(t, err)
}
