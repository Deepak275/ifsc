package parse

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Parse_All(t *testing.T) {
	var p Parser
	err := p.Get()
	assert.Nil(t, err)
	assert.Equal(t, "http://rbidocs.rbi.org.in/rdocs/content/docs/68774.xls", p.parsed)
}
