#!/bin/pwsh




dropdb -U node_user sneakersdb
createdb -U node_user sneakersdb


psql -U node_user sneakersdb | ./bin/sql/sneaker.sql
psql -U node_user sneakersdb | ./bin/sql/brand.sql
