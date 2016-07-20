package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Parser(t *testing.T) {
	var p Parser
	err := p.Read("data/IFCB2009_02.xls")
	// err := p.Read("data/68774.xls")
	assert.Nil(t, err)
}
