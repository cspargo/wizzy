#!/usr/bin/env node
"use strict";

// Setting up directory structure
var dashDir = 'dashboards';
var confDir = 'conf';
var confFile = 'conf/wizzy.json';

// Setting up cli version and commands
var program = require('commander').version('0.1.4');

var Commands = require('./commands.js');
var commands = new Commands(dashDir, confDir, confFile);

// Basic commands
commands.addCommand(program, 'help', commands.help, 'wizzy help',
	'shows wizzy help');

commands.addCommand(program, 'init', commands.init, 'wizzy init',
	'initializes and connects wizzy to Grafana', 'wizzy init http://localhost:3000');

commands.addCommand(program, 'status', commands.status, 'wizzy status',
	'tests Github and Grafana setup for wizzy and return status');

// Config commands
commands.addCommand(program, 'conf', commands.showConfig, 'wizzy conf',
	'shows wizzy configuration');

commands.addCommand(program, 'set', commands.setConfig, 'wizzy set grafana CONFIG_NAME CONFIG_VALUE',
	'sets config options for wizzy', 'wizzy grafana url http://localhost:3000');
/*
// Wizzy commands
commands.addCommand(program, 'copy', commands.instruct, 'wizzy copy ENTITY ENTITY_NAME',
	'copies an entity from one position to another', 'wizzy copy row 2 otherdash.3');

commands.addCommand(program, 'create', commands.instruct, 'wizzy create ENTITY ENTITY_NAME',
	'creates a new entity', 'wizzy create org my-org');

commands.addCommand(program, 'delete', commands.instruct, 'wizzy delete ENTITY ENTITY_NAME',
	'deletes an entity', 'wizzy delete org org_id');

commands.addCommand(program, 'export', commands.instruct, 'wizzy export dashboard DASHBOARD_NAME',
	'exports an entity from local repo to Grafana', 'wizzy export dashboard my-dash');

commands.addCommand(program, 'import', commands.instruct, 'wizzy import dashboard DASHBOARD_NAME',
	'imports an entity from Grafana to local repo', 'wizzy import dashboard my-dash');

commands.addCommand(program, 'move', commands.instruct, 'wizzy move ENTITY ENTITY_NAME',
	'moves an entity from one position to another', 'wizzy move row 2 otherdash.3');

commands.addCommand(program, 'show', commands.instruct, 'wizzy show ENTITY <ENTITY_NAME>',
	'shows an entity', 'wizzy show org 1, wizzy show orgs');

commands.addCommand(program, 'summarize', commands.instruct, 'wizzy summarize ENTITY <ENTITY_NAME>',
	'summarize a large entity in a short user-friendly manner', 'wizzy summarize dashboard dash-cpu');

*/
// For any unsupported command wizzy will show help
program.command('*').action(commands.instruct);

// If there is no argument also, we will show help
program.parse(process.argv);
if (process.argv.length < 3) {
	commands.help();
}