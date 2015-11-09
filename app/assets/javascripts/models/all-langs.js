define(['backbone', 'backbone-eventbroker'], function(Backbone) {
    'use strict';

    var AllLangs = {

        getAll: function () {
            return {
                "colors_and_initials": {
                    "ABAP": {
                        "color": "#E8274B",
                        "initials": 'A'
                    },
                    "AGS Script": {
                        "color": "#B9D9FF",
                        "initials": 'A'
                    },
                    "AMPL": {
                        "color": "#E6EFBB",
                        "initials": 'A'
                    },
                    "ANTLR": {
                        "color": "#9DC3FF",
                        "initials": 'A'
                    },
                    "API Blueprint": {
                        "color": "#2ACCA8",
                        "initials": 'A'
                    },
                    "APL": {
                        "color": "#5A8164",
                        "initials": 'A'
                    },
                    "ASP": {
                        "color": "#6a40fd",
                        "initials": 'A'
                    },
                    "ATS": {
                        "color": "#1ac620",
                        "initials": 'A'
                    },
                    "ActionScript": {
                        "color": "#882B0F",
                        "initials": 'A'
                    },
                    "Ada": {
                        "color": "#02f88c",
                        "initials": 'A'
                    },
                    "Agda": {
                        "color": "#315665",
                        "initials": 'A'
                    },
                    "Alloy": {
                        "color": "#cc5c24",
                        "initials": 'A'
                    },
                    "Ant Build System": {
                        "color": "#000",
                        "initials": 'A'
                    },
                    "ApacheConf": {
                        "color": "#000",
                        "initials": 'A'
                    },
                    "Apex": {
                        "color": "#000",
                        "initials": 'A'
                    },
                    "AppleScript": {
                        "color": "#000",
                        "initials": 'AS'
                    },
                    "Arc": {
                        "color": "#aa2afe",
                        "initials": 'A'
                    },
                    "Arduino": {
                        "color": "#bd79d1",
                        "initials": 'A'
                    },
                    "AsciiDoc": {
                        "color": "#000",
                        "initials": 'A'
                    },
                    "AspectJ": {
                        "color": "#a957b0",
                        "initials": 'A'
                    },
                    "Assembly": {
                        "color": "#6E4C13",
                        "initials": 'A'
                    },
                    "Augeas": {
                        "color": "#000",
                        "initials": 'A'
                    },
                    "AutoHotkey": {
                        "color": "#6594b9",
                        "initials": 'A'
                    },
                    "AutoIt": {
                        "color": "#1C3552",
                        "initials": 'A'
                    },
                    "Awk": {
                        "color": "#000",
                        "initials": 'A'
                    },
                    "Batchfile": {
                        "color": "#000",
                        "initials": 'B'
                    },
                    "Befunge": {
                        "color": "#000",
                        "initials": 'B'
                    },
                    "Bison": {
                        "color": "#000",
                        "initials": 'B'
                    },
                    "BitBake": {
                        "color": "#000",
                        "initials": 'B'
                    },
                    "BlitzBasic": {
                        "color": "#000",
                        "initials": 'B'
                    },
                    "BlitzMax": {
                        "color": "#cd6400",
                        "initials": 'B'
                    },
                    "Bluespec": {
                        "color": "#000",
                        "initials": 'B'
                    },
                    "Boo": {
                        "color": "#d4bec1",
                        "initials": 'B'
                    },
                    "Brainfuck": {
                        "color": "#2F2530",
                        "initials": 'B'
                    },
                    "Brightscript": {
                        "color": "#000",
                        "initials": 'BS'
                    },
                    "Bro": {
                        "color": "#000",
                        "initials": 'B'
                    },
                    "C": {
                        "color": "#555555",
                        "initials": 'C'
                    },
                    "C#": {
                        "color": "#178600",
                        "initials": 'C#'
                    },
                    ".NET": {
                        "color": "#178600",
                        "initials": 'N'
                    },
                    "C++": {
                        "color": "#f34b7d",
                        "initials": 'C++'
                    },
                    "C-ObjDump": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "C2hs Haskell": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "CLIPS": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "CMake": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "COBOL": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "CSS": {
                        "color": "#563d7c",
                        "initials": 'C'
                    },
                    "Blueprint": {
                        "color": "#563d7c",
                        "initials": 'B'
                    },
                    "YAML": {
                        "color": "#000",
                        "initials": 'Y'
                    },
                    "Sass": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "Cap'n Proto": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "CartoCSS": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Ceylon": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Chapel": {
                        "color": "#8dc63f",
                        "initials": 'C'
                    },
                    "ChucK": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Cirru": {
                        "color": "#ccccff",
                        "initials": 'C'
                    },
                    "Clarion": {
                        "color": "#db901e",
                        "initials": 'C'
                    },
                    "Clean": {
                        "color": "#3F85AF",
                        "initials": 'C'
                    },
                    "Clojure": {
                        "color": "#db5855",
                        "initials": 'C'
                    },
                    "CoffeeScript": {
                        "color": "#244776",
                        "initials": 'CS'
                    },
                    "ColdFusion": {
                        "color": "#ed2cd6",
                        "initials": 'C'
                    },
                    "ColdFusion CFC": {
                        "color": "#ed2cd6",
                        "initials": 'C'
                    },
                    "Common Lisp": {
                        "color": "#3fb68b",
                        "initials": 'CL'
                    },
                    "Component Pascal": {
                        "color": "#b0ce4e",
                        "initials": 'C'
                    },
                    "Cool": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Coq": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Cpp-ObjDump": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Creole": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Crystal": {
                        "color": "#776791",
                        "initials": 'C'
                    },
                    "Cucumber": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Cuda": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Cycript": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "Cython": {
                        "color": "#000",
                        "initials": 'C'
                    },
                    "D": {
                        "color": "#fcd46d",
                        "initials": 'D'
                    },
                    "D-ObjDump": {
                        "color": "#000",
                        "initials": 'D'
                    },
                    "DIGITAL Command Language": {
                        "color": "#000",
                        "initials": 'D'
                    },
                    "DM": {
                        "color": "#447265",
                        "initials": 'D'
                    },
                    "DTrace": {
                        "color": "#000",
                        "initials": 'D'
                    },
                    "Darcs Patch": {
                        "color": "#000",
                        "initials": 'D'
                    },
                    "Dart": {
                        "color": "#00B4AB",
                        "initials": 'D'
                    },
                    "Diff": {
                        "color": "#88dddd",
                        "initials": 'D'
                    },
                    "Dockerfile": {
                        "color": "#000",
                        "initials": 'D'
                    },
                    "Dogescript": {
                        "color": "#cca760",
                        "initials": 'DS'
                    },
                    "Dylan": {
                        "color": "#6c616e",
                        "initials": 'D'
                    },
                    "E": {
                        "color": "#ccce35",
                        "initials": 'E'
                    },
                    "ECL": {
                        "color": "#8a1267",
                        "initials": 'E'
                    },
                    "Eagle": {
                        "color": "#814C05",
                        "initials": 'E'
                    },
                    "Ecere Projects": {
                        "color": "#000",
                        "initials": 'E'
                    },
                    "Eiffel": {
                        "color": "#946d57",
                        "initials": 'E'
                    },
                    "Elixir": {
                        "color": "#6e4a7e",
                        "initials": 'E'
                    },
                    "Elm": {
                        "color": "#60B5CC",
                        "initials": 'E'
                    },
                    "Emacs Lisp": {
                        "color": "#c065db",
                        "initials": 'EL'
                    },
                    "EmberScript": {
                        "color": "#FFF4F3",
                        "initials": 'ES'
                    },
                    "Erlang": {
                        "color": "#B83998",
                        "initials": 'E'
                    },
                    "F#": {
                        "color": "#b845fc",
                        "initials": 'F#'
                    },
                    "FLUX": {
                        "color": "#88ccff",
                        "initials": 'F'
                    },
                    "FORTRAN": {
                        "color": "#4d41b1",
                        "initials": 'F'
                    },
                    "Factor": {
                        "color": "#636746",
                        "initials": 'F'
                    },
                    "Fancy": {
                        "color": "#7b9db4",
                        "initials": 'F'
                    },
                    "Fantom": {
                        "color": "#dbded5",
                        "initials": 'F'
                    },
                    "Filterscript": {
                        "color": "#000",
                        "initials": 'FS'
                    },
                    "Formatted": {
                        "color": "#000",
                        "initials": 'F'
                    },
                    "Forth": {
                        "color": "#341708",
                        "initials": 'F'
                    },
                    "Frege": {
                        "color": "#00cafe",
                        "initials": 'F'
                    },
                    "G-code": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "GAMS": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "GAP": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "GAS": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "GDScript": {
                        "color": "#000",
                        "initials": 'GS'
                    },
                    "GLSL": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Game Maker Language": {
                        "color": "#8fb200",
                        "initials": 'G'
                    },
                    "Genshi": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Gentoo Ebuild": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Gentoo Eclass": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Gettext Catalog": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Glyph": {
                        "color": "#e4cc98",
                        "initials": 'G'
                    },
                    "Gnuplot": {
                        "color": "#f0a9f0",
                        "initials": 'G'
                    },
                    "Go": {
                        "color": "#375eab",
                        "initials": 'Go'
                    },
                    "Golo": {
                        "color": "#88562A",
                        "initials": 'G'
                    },
                    "Gosu": {
                        "color": "#82937f",
                        "initials": 'G'
                    },
                    "Grace": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Gradle": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Grammatical Framework": {
                        "color": "#79aa7a",
                        "initials": 'G'
                    },
                    "Graph Modeling Language": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Graphviz (DOT)": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Groff": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "Groovy": {
                        "color": "#e69f56",
                        "initials": 'G'
                    },
                    "Groovy Server Pages": {
                        "color": "#000",
                        "initials": 'G'
                    },
                    "HTML": {
                        "color": "#e44b23",
                        "initials": 'H'
                    },
                    "HTML+Django": {
                        "color": "#000",
                        "initials": 'H'
                    },
                    "HTML+ERB": {
                        "color": "#000",
                        "initials": 'H'
                    },
                    "HTML+PHP": {
                        "color": "#000",
                        "initials": 'H'
                    },
                    "HTTP": {
                        "color": "#000",
                        "initials": 'H'
                    },
                    "Hack": {
                        "color": "#000",
                        "initials": 'H'
                    },
                    "Haml": {
                        "color": "#000",
                        "initials": 'H'
                    },
                    "Handlebars": {
                        "color": "#01a9d6",
                        "initials": 'H'
                    },
                    "Harbour": {
                        "color": "#0e60e3",
                        "initials": 'H'
                    },
                    "Haskell": {
                        "color": "#29b544",
                        "initials": 'H'
                    },
                    "Haxe": {
                        "color": "#df7900",
                        "initials": 'H'
                    },
                    "Hy": {
                        "color": "#7790B2",
                        "initials": 'H'
                    },
                    "HyPhy": {
                        "color": "#000",
                        "initials": 'H'
                    },
                    "IDL": {
                        "color": "#a3522f",
                        "initials": 'I'
                    },
                    "IGOR Pro": {
                        "color": "#000",
                        "initials": 'I'
                    },
                    "INI": {
                        "color": "#000",
                        "initials": 'I'
                    },
                    "IRC log": {
                        "color": "#000",
                        "initials": 'I'
                    },
                    "Idris": {
                        "color": "#000",
                        "initials": 'I'
                    },
                    "Inform 7": {
                        "color": "#000",
                        "initials": 'I7'
                    },
                    "Inno Setup": {
                        "color": "#000",
                        "initials": 'I'
                    },
                    "Io": {
                        "color": "#a9188d",
                        "initials": 'I'
                    },
                    "Ioke": {
                        "color": "#078193",
                        "initials": 'I'
                    },
                    "Isabelle": {
                        "color": "#FEFE00",
                        "initials": 'I'
                    },
                    "Isabelle ROOT": {
                        "color": "#000",
                        "initials": 'I'
                    },
                    "J": {
                        "color": "#9EEDFF",
                        "initials": 'J'
                    },
                    "JFlex": {
                        "color": "#DBCA00",
                        "initials": 'JF'
                    },
                    "JSON": {
                        "color": "#000",
                        "initials": 'J'
                    },
                    "JSON5": {
                        "color": "#000",
                        "initials": 'J'
                    },
                    "JSONLD": {
                        "color": "#000",
                        "initials": 'J'
                    },
                    "JSONiq": {
                        "color": "#40d47e",
                        "initials": 'J'
                    },
                    "Jade": {
                        "color": "#000",
                        "initials": 'J'
                    },
                    "Jasmin": {
                        "color": "#000",
                        "initials": 'J'
                    },
                    "Java Server Pages": {
                        "color": "#000",
                        "initials": 'J'
                    },
                    "JavaScript": {
                        "color": "#f1e05a",
                        "initials": 'JS'
                    },
                    "Express": {
                        "color": "#f1e05a",
                        "initials": 'E'
                    },
                    "Backbone": {
                        "color": "#f1e05a",
                        "initials": 'B'
                    },
                    "Angular": {
                        "color": "#f1e05a",
                        "initials": 'A'
                    },
                    "Node": {
                        "color": "#f1e05a",
                        "initials": 'N'
                    },
                    "React": {
                        "color": "#f1e05a",
                        "initials": 'R'
                    },
                    "Ember": {
                        "color": "#f1e05a",
                        "initials": 'E'
                    },
                    "Famo.us": {
                        "color": "#f1e05a",
                        "initials": 'F'
                    },
                    "Protoype": {
                        "color": "#f1e05a",
                        "initials": 'P'
                    },
                    "ExtJS": {
                        "color": "#f1e05a",
                        "initials": 'E'
                    },
                    "Mootools": {
                        "color": "#f1e05a",
                        "initials": 'M'
                    },
                    "Spry": {
                        "color": "#f1e05a",
                        "initials": 'S'
                    },
                    "script.aculo.us": {
                        "color": "#f1e05a",
                        "initials": 'S'
                    },
                    "ASP.NET": {
                        "color": "#f1e05a",
                        "initials": 'A'
                    },
                    "Dojo": {
                        "color": "#f1e05a",
                        "initials": 'D'
                    },
                    "MochiKit": {
                        "color": "#f1e05a",
                        "initials": 'M'
                    },
                    "Julia": {
                        "color": "#a270ba",
                        "initials": 'J'
                    },
                    "KRL": {
                        "color": "#28431f",
                        "initials": 'K'
                    },
                    "KiCad": {
                        "color": "#000",
                        "initials": 'K'
                    },
                    "Kit": {
                        "color": "#000",
                        "initials": 'K'
                    },
                    "Kotlin": {
                        "color": "#F18E33",
                        "initials": 'K'
                    },
                    "LFE": {
                        "color": "#004200",
                        "initials": 'L'
                    },
                    "LLVM": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "LOLCODE": {
                        "color": "#cc9900",
                        "initials": 'L'
                    },
                    "LSL": {
                        "color": "#3d9970",
                        "initials": 'L'
                    },
                    "LabVIEW": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Lasso": {
                        "color": "#999999",
                        "initials": 'L'
                    },
                    "Latte": {
                        "color": "#A8FF97",
                        "initials": 'L'
                    },
                    "Lean": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Less": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Lex": {
                        "color": "#DBCA00",
                        "initials": 'L'
                    },
                    "LilyPond": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Limbo": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Linker Script": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Linux Kernel Module": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Liquid": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Literate Agda": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Literate CoffeeScript": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Literate Haskell": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "LiveScript": {
                        "color": "#499886",
                        "initials": 'L'
                    },
                    "Logos": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Logtalk": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "LookML": {
                        "color": "#652B81",
                        "initials": 'L'
                    },
                    "LoomScript": {
                        "color": "#000",
                        "initials": 'L'
                    },
                    "Lua": {
                        "color": "#000080",
                        "initials": 'L'
                    },
                    "M": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "MTML": {
                        "color": "#b7e1f4",
                        "initials": 'M'
                    },
                    "MUF": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Makefile": {
                        "color": "#427819",
                        "initials": 'Mk'
                    },
                    "Mako": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Markdown": {
                        "color": "#000",
                        "initials": 'Md'
                    },
                    "Mask": {
                        "color": "#f97732",
                        "initials": 'M'
                    },
                    "Mathematica": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Matlab": {
                        "color": "#bb92ac",
                        "initials": 'M'
                    },
                    "Maven POM": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Max": {
                        "color": "#c4a79c",
                        "initials": 'M'
                    },
                    "MediaWiki": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Mercury": {
                        "color": "#ff2b2b",
                        "initials": 'M'
                    },
                    "MiniD": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Mirah": {
                        "color": "#c7a938",
                        "initials": 'M'
                    },
                    "Modelica": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Modula-2": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Module Management System": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Monkey": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "Moocode": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "MoonScript": {
                        "color": "#000",
                        "initials": 'MS'
                    },
                    "Myghty": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "NCL": {
                        "color": "#000",
                        "initials": 'N'
                    },
                    "NL": {
                        "color": "#000",
                        "initials": 'N'
                    },
                    "NSIS": {
                        "color": "#000",
                        "initials": 'N'
                    },
                    "Nemerle": {
                        "color": "#3d3c6e",
                        "initials": 'N'
                    },
                    "NetLinx": {
                        "color": "#0aa0ff",
                        "initials": 'N'
                    },
                    "NetLinx+ERB": {
                        "color": "#747faa",
                        "initials": 'N'
                    },
                    "NetLogo": {
                        "color": "#ff6375",
                        "initials": 'N'
                    },
                    "NewLisp": {
                        "color": "#87AED7",
                        "initials": 'N'
                    },
                    "Nginx": {
                        "color": "#000",
                        "initials": 'N'
                    },
                    "Nimrod": {
                        "color": "#37775b",
                        "initials": 'N'
                    },
                    "Ninja": {
                        "color": "#000",
                        "initials": 'N'
                    },
                    "Nit": {
                        "color": "#009917",
                        "initials": 'N'
                    },
                    "Nix": {
                        "color": "#7e7eff",
                        "initials": 'N'
                    },
                    "Nu": {
                        "color": "#c9df40",
                        "initials": 'N'
                    },
                    "NumPy": {
                        "color": "#000",
                        "initials": 'N'
                    },
                    "OCaml": {
                        "color": "#3be133",
                        "initials": 'O'
                    },
                    "ObjDump": {
                        "color": "#000",
                        "initials": 'O'
                    },
                    "Objective-C": {
                        "color": "#438eff",
                        "initials": 'O'
                    },
                    "Objective-C++": {
                        "color": "#6866fb",
                        "initials": 'O'
                    },
                    "Objective-J": {
                        "color": "#ff0c5a",
                        "initials": 'O'
                    },
                    "Omgrofl": {
                        "color": "#cabbff",
                        "initials": 'O'
                    },
                    "Opa": {
                        "color": "#000",
                        "initials": 'O'
                    },
                    "Opal": {
                        "color": "#f7ede0",
                        "initials": 'O'
                    },
                    "OpenCL": {
                        "color": "#000",
                        "initials": 'O'
                    },
                    "OpenEdge ABL": {
                        "color": "#000",
                        "initials": 'O'
                    },
                    "OpenSCAD": {
                        "color": "#000",
                        "initials": 'O'
                    },
                    "Org": {
                        "color": "#000",
                        "initials": 'O'
                    },
                    "Ox": {
                        "color": "#000",
                        "initials": 'O'
                    },
                    "Oxygene": {
                        "color": "#cdd0e3",
                        "initials": 'O'
                    },
                    "Oz": {
                        "color": "#fab738",
                        "initials": 'O'
                    },
                    "PAWN": {
                        "color": "#dbb284",
                        "initials": 'P'
                    },
                    "PHP": {
                        "color": "#4F5D95",
                        "initials": 'P'
                    },
                    "Zend": {
                        "color": "#4F5D95",
                        "initials": 'Z'
                    },
                    "CakePHP": {
                        "color": "#4F5D95",
                        "initials": 'C'
                    },
                    "Symfony": {
                        "color": "#4F5D95",
                        "initials": 'S'
                    },
                    "CodeIgniter": {
                        "color": "#4F5D95",
                        "initials": 'C'
                    },
                    "Akelos": {
                        "color": "#4F5D95",
                        "initials": 'A'
                    },
                    "Agavi": {
                        "color": "#4F5D95",
                        "initials": 'A'
                    },
                    "Prado": {
                        "color": "#4F5D95",
                        "initials": 'P'
                    },
                    "Barebones": {
                        "color": "#4F5D95",
                        "initials": 'B'
                    },
                    "Laravel": {
                        "color": "#4F5D95",
                        "initials": 'L'
                    },
                    "PLSQL": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "PLpgSQL": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "Pan": {
                        "color": "#cc0000",
                        "initials": 'P'
                    },
                    "Papyrus": {
                        "color": "#6600cc",
                        "initials": 'P'
                    },
                    "Parrot": {
                        "color": "#f3ca0a",
                        "initials": 'P'
                    },
                    "Parrot Assembly": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "Parrot Internal Representation": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "Pascal": {
                        "color": "#b0ce4e",
                        "initials": 'P'
                    },
                    "Perl": {
                        "color": "#0298c3",
                        "initials": 'P'
                    },
                    "Perl6": {
                        "color": "#0000fb",
                        "initials": 'P'
                    },
                    "PicoLisp": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "PigLatin": {
                        "color": "#fcd7de",
                        "initials": 'P'
                    },
                    "Pike": {
                        "color": "#005390",
                        "initials": 'P'
                    },
                    "Pod": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "PogoScript": {
                        "color": "#d80074",
                        "initials": 'P'
                    },
                    "PostScript": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "PowerShell": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "Processing": {
                        "color": "#0096D8",
                        "initials": 'P'
                    },
                    "Prolog": {
                        "color": "#74283c",
                        "initials": 'P'
                    },
                    "Propeller Spin": {
                        "color": "#7fa2a7",
                        "initials": 'PS'
                    },
                    "Protocol Buffer": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "Public Key": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "Puppet": {
                        "color": "#332A77",
                        "initials": 'P'
                    },
                    "Pure Data": {
                        "color": "#91de79",
                        "initials": 'P'
                    },
                    "PureBasic": {
                        "color": "#5a6986",
                        "initials": 'P'
                    },
                    "PureScript": {
                        "color": "#1D222D",
                        "initials": 'P'
                    },
                    "Python": {
                        "color": "#3572A5",
                        "initials": 'Py'
                    },
                    "Django": {
                        "color": "#3572A5",
                        "initials": 'Dj'
                    },
                    "Flask": {
                        "color": "#3572A5",
                        "initials": 'F'
                    },
                    "Pylons": {
                        "color": "#3572A5",
                        "initials": 'P'
                    },
                    "TurboGears": {
                        "color": "#3572A5",
                        "initials": 'T'
                    },
                    "Gluon": {
                        "color": "#3572A5",
                        "initials": 'G'
                    },
                    "Python traceback": {
                        "color": "#000",
                        "initials": 'P'
                    },
                    "QML": {
                        "color": "#44a51c",
                        "initials": 'Q'
                    },
                    "QMake": {
                        "color": "#000",
                        "initials": 'Q'
                    },
                    "R": {
                        "color": "#198ce7",
                        "initials": 'R'
                    },
                    "RAML": {
                        "color": "#77d9fb",
                        "initials": 'R'
                    },
                    "RDoc": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "REALbasic": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "RHTML": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "RMarkdown": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "Racket": {
                        "color": "#22228f",
                        "initials": 'R'
                    },
                    "Ragel in Ruby Host": {
                        "color": "#9d5200",
                        "initials": 'R'
                    },
                    "Raw token data": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "Rebol": {
                        "color": "#358a5b",
                        "initials": 'R'
                    },
                    "Red": {
                        "color": "#ee0000",
                        "initials": 'R'
                    },
                    "Redcode": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "RenderScript": {
                        "color": "#000",
                        "initials": 'RS'
                    },
                    "RobotFramework": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "Rouge": {
                        "color": "#cc0088",
                        "initials": 'R'
                    },
                    "Ruby": {
                        "color": "#701516",
                        "initials": 'Rb'
                    },
                    "Rails": {
                        "color": "#701516",
                        "initials": 'R'
                    },
                    "Nitro": {
                        "color": "#701516",
                        "initials": 'N'
                    },
                    "Camping": {
                        "color": "#701516",
                        "initials": 'C'
                    },
                    "Ramaze": {
                        "color": "#701516",
                        "initials": 'R'
                    },
                    "Rust": {
                        "color": "#dea584",
                        "initials": 'R'
                    },
                    "SAS": {
                        "color": "#B34936",
                        "initials": 'S'
                    },
                    "SCSS": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SMT": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SPARQL": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SQF": {
                        "color": "#3F3F3F",
                        "initials": 'S'
                    },
                    "SQL": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SQLPL": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "STON": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SVG": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "Sage": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SaltStack": {
                        "color": "#646464",
                        "initials": 'S'
                    },
                    "Scala": {
                        "color": "#7dd3b0",
                        "initials": 'S'
                    },
                    "Scaml": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "Scheme": {
                        "color": "#1e4aec",
                        "initials": 'S'
                    },
                    "Scilab": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "Self": {
                        "color": "#0579aa",
                        "initials": 'S'
                    },
                    "Shell": {
                        "color": "#89e051",
                        "initials": 'S'
                    },
                    "Bash": {
                        "color": "#89e051",
                        "initials": 'B'
                    },
                    "ShellSession": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "Shen": {
                        "color": "#120F14",
                        "initials": 'S'
                    },
                    "Slash": {
                        "color": "#007eff",
                        "initials": 'S'
                    },
                    "Slim": {
                        "color": "#ff8f77",
                        "initials": 'S'
                    },
                    "Smali": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "Smalltalk": {
                        "color": "#596706",
                        "initials": 'S'
                    },
                    "Smarty": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SourcePawn": {
                        "color": "#5c7611",
                        "initials": 'S'
                    },
                    "Squirrel": {
                        "color": "#800000",
                        "initials": 'S'
                    },
                    "Standard ML": {
                        "color": "#dc566d",
                        "initials": 'S'
                    },
                    "Stata": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "Stylus": {
                        "color": "#000",
                        "initials": 'S'
                    },
                    "SuperCollider": {
                        "color": "#46390b",
                        "initials": 'S'
                    },
                    "Swift": {
                        "color": "#ffac45",
                        "initials": 'S'
                    },
                    "SystemVerilog": {
                        "color": "#DAE1C2",
                        "initials": 'S'
                    },
                    "Tcl": {
                        "color": "#e4cc98",
                        "initials": 'T'
                    },
                    "Tcsh": {
                        "color": "#000",
                        "initials": 'T'
                    },
                    "TeX": {
                        "color": "#3D6117",
                        "initials": 'T'
                    },
                    "Tea": {
                        "color": "#000",
                        "initials": 'T'
                    },
                    "Text": {
                        "color": "#000",
                        "initials": 'T'
                    },
                    "Textile": {
                        "color": "#000",
                        "initials": 'T'
                    },
                    "Thrift": {
                        "color": "#000",
                        "initials": 'T'
                    },
                    "Turing": {
                        "color": "#45f715",
                        "initials": 'T'
                    },
                    "Turtle": {
                        "color": "#000",
                        "initials": 'T'
                    },
                    "Twig": {
                        "color": "#000",
                        "initials": 'T'
                    },
                    "TypeScript": {
                        "color": "#2b7489",
                        "initials": 'TS'
                    },
                    "Unified Parallel C": {
                        "color": "#4e3617",
                        "initials": 'U'
                    },
                    "Unity3D Asset": {
                        "color": "#ab69a1",
                        "initials": 'U'
                    },
                    "UnrealScript": {
                        "color": "#a54c4d",
                        "initials": 'US'
                    },
                    "VCL": {
                        "color": "#000",
                        "initials": 'V'
                    },
                    "VHDL": {
                        "color": "#adb2cb",
                        "initials": 'V'
                    },
                    "Vala": {
                        "color": "#fbe5cd",
                        "initials": 'V'
                    },
                    "Verilog": {
                        "color": "#b2b7f8",
                        "initials": 'V'
                    },
                    "VimL": {
                        "color": "#199f4b",
                        "initials": 'V'
                    },
                    "Visual Basic": {
                        "color": "#945db7",
                        "initials": 'VB'
                    },
                    "Volt": {
                        "color": "#1F1F1F",
                        "initials": 'V'
                    },
                    "Web Ontology Language": {
                        "color": "#9cc9dd",
                        "initials": 'W'
                    },
                    "XC": {
                        "color": "#99DA07",
                        "initials": 'X'
                    },
                    "XML": {
                        "color": "#000",
                        "initials": 'X'
                    },
                    "XProc": {
                        "color": "#000",
                        "initials": 'X'
                    },
                    "XQuery": {
                        "color": "#5232e7",
                        "initials": 'X'
                    },
                    "XS": {
                        "color": "#000",
                        "initials": 'X'
                    },
                    "XSLT": {
                        "color": "#000",
                        "initials": 'X'
                    },
                    "Xojo": {
                        "color": "#000",
                        "initials": 'X'
                    },
                    "Xtend": {
                        "color": "#000",
                        "initials": 'X'
                    },
                    "Yacc": {
                        "color": "#000",
                        "initials": 'Y'
                    },
                    "Zephir": {
                        "color": "#118f9e",
                        "initials": 'Z'
                    },
                    "Zimpl": {
                        "color": "#000",
                        "initials": 'Z'
                    },
                    "desktop": {
                        "color": "#000",
                        "initials": 'D'
                    },
                    "eC": {
                        "color": "#913960",
                        "initials": 'E'
                    },
                    "edn": {
                        "color": "#db5855",
                        "initials": 'E'
                    },
                    "fish": {
                        "color": "#000",
                        "initials": 'F'
                    },
                    "mupad": {
                        "color": "#000",
                        "initials": 'M'
                    },
                    "nesC": {
                        "color": "#94B0C7",
                        "initials": 'N'
                    },
                    "ooc": {
                        "color": "#b0b77e",
                        "initials": 'O'
                    },
                    "reStructuredText": {
                        "color": "#000",
                        "initials": 'R'
                    },
                    "wisp": {
                        "color": "#7582D1",
                        "initials": 'W'
                    },
                    "xBase": {
                        "color": "#403a40",
                        "initials": 'xB'
                    },
                    "Java": {
                        "color": "#b07219",
                        "initials": 'J'
                    },
                    "Android": {
                        "color": "#b07219",
                        "initials": 'A'
                    },
                    "Spring": {
                        "color": "#b07219",
                        "initials": 'S'
                    },
                    "GWT": {
                        "color": "#b07219",
                        "initials": 'G'
                    },
                    "Cocoon": {
                        "color": "#b07219",
                        "initials": 'C'
                    },
                    "Aranea": {
                        "color": "#b07219",
                        "initials": 'A'
                    },
                    "JSF": {
                        "color": "#b07219",
                        "initials": 'J'
                    },
                    "AppFuse": {
                        "color": "#b07219",
                        "initials": 'A'
                    },
                    "Struts": {
                        "color": "#b07219",
                        "initials": 'S'
                    }
                },
                "all_frames": {
                    ".NET": "C#",
                    "Blueprint": "CSS",
                    "YAML": "CSS",
                    "Sass": "CSS",
                    "Express": "JavaScript",
                    "Backbone": "JavaScript",
                    "Angular": "JavaScript",
                    "Node": "JavaScript",
                    "React": "JavaScript",
                    "Ember": "JavaScript",
                    "Famo.us": "JavaScript",
                    "Protoype": "JavaScript",
                    "ExtJS": "JavaScript",
                    "Mootools": "JavaScript",
                    "Spry": "JavaScript",
                    "script.aculo.us": "JavaScript",
                    "ASP.NET": "JavaScript",
                    "Dojo": "JavaScript",
                    "MochiKit": "JavaScript",
                    "Zend": "PHP",
                    "CakePHP": "PHP",
                    "Symfony": "PHP",
                    "CodeIgniter": "PHP",
                    "Akelos": "PHP",
                    "Agavi": "PHP",
                    "Prado": "PHP",
                    "Barebones": "PHP",
                    "Laravel": "PHP",
                    "Django": "Python",
                    "Flask": "Python",
                    "Pylons": "Python",
                    "TurboGears": "Python",
                    "Gluon": "Python",
                    "Rails": "Ruby",
                    "Nitro": "Ruby",
                    "Camping": "Ruby",
                    "Ramaze": "Ruby",
                    "Bash": "Shell",
                    "Android": "Java",
                    "Spring": "Java",
                    "GWT": "Java",
                    "Cocoon": "Java",
                    "Aranea": "Java",
                    "JSF": "Java",
                    "AppFuse": "Java",
                    "Struts": "Java"
                },
                "dropdown_items": [
                    {
                        "id": ".NET",
                        "title": ".NET"
                    },
                    {
                        "id": "ABAP",
                        "title": "ABAP"
                    },
                    {
                        "id": "ActionScript",
                        "title": "ActionScript"
                    },
                    {
                        "id": "Ada",
                        "title": "Ada"
                    },
                    {
                        "id": "Agavi",
                        "title": "Agavi"
                    },
                    {
                        "id": "Agda",
                        "title": "Agda"
                    },
                    {
                        "id": "AGS Script",
                        "title": "AGS Script"
                    },
                    {
                        "id": "Akelos",
                        "title": "Akelos"
                    },
                    {
                        "id": "Alloy",
                        "title": "Alloy"
                    },
                    {
                        "id": "AMPL",
                        "title": "AMPL"
                    },
                    {
                        "id": "Android",
                        "title": "Android"
                    },
                    {
                        "id": "Angular",
                        "title": "Angular"
                    },
                    {
                        "id": "Angular",
                        "title": "Angular"
                    },
                    {
                        "id": "Ant Build System",
                        "title": "Ant Build System"
                    },
                    {
                        "id": "ANTLR",
                        "title": "ANTLR"
                    },
                    {
                        "id": "ApacheConf",
                        "title": "ApacheConf"
                    },
                    {
                        "id": "Apex",
                        "title": "Apex"
                    },
                    {
                        "id": "API Blueprint",
                        "title": "API Blueprint"
                    },
                    {
                        "id": "APL",
                        "title": "APL"
                    },
                    {
                        "id": "AppFuse",
                        "title": "AppFuse"
                    },
                    {
                        "id": "AppleScript",
                        "title": "AppleScript"
                    },
                    {
                        "id": "Aranea",
                        "title": "Aranea"
                    },
                    {
                        "id": "Arc",
                        "title": "Arc"
                    },
                    {
                        "id": "Arduino",
                        "title": "Arduino"
                    },
                    {
                        "id": "AsciiDoc",
                        "title": "AsciiDoc"
                    },
                    {
                        "id": "ASP",
                        "title": "ASP"
                    },
                    {
                        "id": "ASP.NET",
                        "title": "ASP.NET"
                    },
                    {
                        "id": "AspectJ",
                        "title": "AspectJ"
                    },
                    {
                        "id": "Assembly",
                        "title": "Assembly"
                    },
                    {
                        "id": "ATS",
                        "title": "ATS"
                    },
                    {
                        "id": "Augeas",
                        "title": "Augeas"
                    },
                    {
                        "id": "AutoHotkey",
                        "title": "AutoHotkey"
                    },
                    {
                        "id": "AutoIt",
                        "title": "AutoIt"
                    },
                    {
                        "id": "Awk",
                        "title": "Awk"
                    },
                    {
                        "id": "Backbone",
                        "title": "Backbone"
                    },
                    {
                        "id": "Barebones",
                        "title": "Barebones"
                    },
                    {
                        "id": "Bash",
                        "title": "Bash"
                    },
                    {
                        "id": "Batchfile",
                        "title": "Batchfile"
                    },
                    {
                        "id": "Befunge",
                        "title": "Befunge"
                    },
                    {
                        "id": "Bison",
                        "title": "Bison"
                    },
                    {
                        "id": "BitBake",
                        "title": "BitBake"
                    },
                    {
                        "id": "BlitzBasic",
                        "title": "BlitzBasic"
                    },
                    {
                        "id": "BlitzMax",
                        "title": "BlitzMax"
                    },
                    {
                        "id": "Blueprint",
                        "title": "Blueprint"
                    },
                    {
                        "id": "Bluespec",
                        "title": "Bluespec"
                    },
                    {
                        "id": "Boo",
                        "title": "Boo"
                    },
                    {
                        "id": "Brainfuck",
                        "title": "Brainfuck"
                    },
                    {
                        "id": "Brightscript",
                        "title": "Brightscript"
                    },
                    {
                        "id": "Bro",
                        "title": "Bro"
                    },
                    {
                        "id": "C",
                        "title": "C"
                    },
                    {
                        "id": "C#",
                        "title": "C#"
                    },
                    {
                        "id": "C++",
                        "title": "C++"
                    },
                    {
                        "id": "C-ObjDump",
                        "title": "C-ObjDump"
                    },
                    {
                        "id": "C2hs Haskell",
                        "title": "C2hs Haskell"
                    },
                    {
                        "id": "CakePHP",
                        "title": "CakePHP"
                    },
                    {
                        "id": "Camping",
                        "title": "Camping"
                    },
                    {
                        "id": "Cap'n Proto",
                        "title": "Cap'n Proto"
                    },
                    {
                        "id": "CartoCSS",
                        "title": "CartoCSS"
                    },
                    {
                        "id": "Ceylon",
                        "title": "Ceylon"
                    },
                    {
                        "id": "Chapel",
                        "title": "Chapel"
                    },
                    {
                        "id": "ChucK",
                        "title": "ChucK"
                    },
                    {
                        "id": "Cirru",
                        "title": "Cirru"
                    },
                    {
                        "id": "Clarion",
                        "title": "Clarion"
                    },
                    {
                        "id": "Clean",
                        "title": "Clean"
                    },
                    {
                        "id": "CLIPS",
                        "title": "CLIPS"
                    },
                    {
                        "id": "Clojure",
                        "title": "Clojure"
                    },
                    {
                        "id": "CMake",
                        "title": "CMake"
                    },
                    {
                        "id": "COBOL",
                        "title": "COBOL"
                    },
                    {
                        "id": "Cocoon",
                        "title": "Cocoon"
                    },
                    {
                        "id": "CodeIgniter",
                        "title": "CodeIgniter"
                    },
                    {
                        "id": "CoffeeScript",
                        "title": "CoffeeScript"
                    },
                    {
                        "id": "ColdFusion",
                        "title": "ColdFusion"
                    },
                    {
                        "id": "ColdFusion CFC",
                        "title": "ColdFusion CFC"
                    },
                    {
                        "id": "Common Lisp",
                        "title": "Common Lisp"
                    },
                    {
                        "id": "Component Pascal",
                        "title": "Component Pascal"
                    },
                    {
                        "id": "Cool",
                        "title": "Cool"
                    },
                    {
                        "id": "Coq",
                        "title": "Coq"
                    },
                    {
                        "id": "Cpp-ObjDump",
                        "title": "Cpp-ObjDump"
                    },
                    {
                        "id": "Creole",
                        "title": "Creole"
                    },
                    {
                        "id": "Crystal",
                        "title": "Crystal"
                    },
                    {
                        "id": "CSS",
                        "title": "CSS"
                    },
                    {
                        "id": "Cucumber",
                        "title": "Cucumber"
                    },
                    {
                        "id": "Cuda",
                        "title": "Cuda"
                    },
                    {
                        "id": "Cycript",
                        "title": "Cycript"
                    },
                    {
                        "id": "Cython",
                        "title": "Cython"
                    },
                    {
                        "id": "D",
                        "title": "D"
                    },
                    {
                        "id": "D-ObjDump",
                        "title": "D-ObjDump"
                    },
                    {
                        "id": "Darcs Patch",
                        "title": "Darcs Patch"
                    },
                    {
                        "id": "Dart",
                        "title": "Dart"
                    },
                    {
                        "id": "desktop",
                        "title": "desktop"
                    },
                    {
                        "id": "Diff",
                        "title": "Diff"
                    },
                    {
                        "id": "DIGITAL Command Language",
                        "title": "DIGITAL Command Language"
                    },
                    {
                        "id": "Django",
                        "title": "Django"
                    },
                    {
                        "id": "DM",
                        "title": "DM"
                    },
                    {
                        "id": "Dockerfile",
                        "title": "Dockerfile"
                    },
                    {
                        "id": "Dogescript",
                        "title": "Dogescript"
                    },
                    {
                        "id": "Dojo",
                        "title": "Dojo"
                    },
                    {
                        "id": "DTrace",
                        "title": "DTrace"
                    },
                    {
                        "id": "Dylan",
                        "title": "Dylan"
                    },
                    {
                        "id": "E",
                        "title": "E"
                    },
                    {
                        "id": "Eagle",
                        "title": "Eagle"
                    },
                    {
                        "id": "eC",
                        "title": "eC"
                    },
                    {
                        "id": "Ecere Projects",
                        "title": "Ecere Projects"
                    },
                    {
                        "id": "ECL",
                        "title": "ECL"
                    },
                    {
                        "id": "edn",
                        "title": "edn"
                    },
                    {
                        "id": "Eiffel",
                        "title": "Eiffel"
                    },
                    {
                        "id": "Elixir",
                        "title": "Elixir"
                    },
                    {
                        "id": "Elm",
                        "title": "Elm"
                    },
                    {
                        "id": "Emacs Lisp",
                        "title": "Emacs Lisp"
                    },
                    {
                        "id": "Ember",
                        "title": "Ember"
                    },
                    {
                        "id": "EmberScript",
                        "title": "EmberScript"
                    },
                    {
                        "id": "Erlang",
                        "title": "Erlang"
                    },
                    {
                        "id": "Express",
                        "title": "Express"
                    },
                    {
                        "id": "ExtJS",
                        "title": "ExtJS"
                    },
                    {
                        "id": "F#",
                        "title": "F#"
                    },
                    {
                        "id": "Factor",
                        "title": "Factor"
                    },
                    {
                        "id": "Famo.us",
                        "title": "Famo.us"
                    },
                    {
                        "id": "Fancy",
                        "title": "Fancy"
                    },
                    {
                        "id": "Fantom",
                        "title": "Fantom"
                    },
                    {
                        "id": "Filterscript",
                        "title": "Filterscript"
                    },
                    {
                        "id": "fish",
                        "title": "fish"
                    },
                    {
                        "id": "Flask",
                        "title": "Flask"
                    },
                    {
                        "id": "FLUX",
                        "title": "FLUX"
                    },
                    {
                        "id": "Formatted",
                        "title": "Formatted"
                    },
                    {
                        "id": "Forth",
                        "title": "Forth"
                    },
                    {
                        "id": "FORTRAN",
                        "title": "FORTRAN"
                    },
                    {
                        "id": "Frege",
                        "title": "Frege"
                    },
                    {
                        "id": "G-code",
                        "title": "G-code"
                    },
                    {
                        "id": "Game Maker Language",
                        "title": "Game Maker Language"
                    },
                    {
                        "id": "GAMS",
                        "title": "GAMS"
                    },
                    {
                        "id": "GAP",
                        "title": "GAP"
                    },
                    {
                        "id": "GAS",
                        "title": "GAS"
                    },
                    {
                        "id": "GDScript",
                        "title": "GDScript"
                    },
                    {
                        "id": "Genshi",
                        "title": "Genshi"
                    },
                    {
                        "id": "Gentoo Ebuild",
                        "title": "Gentoo Ebuild"
                    },
                    {
                        "id": "Gentoo Eclass",
                        "title": "Gentoo Eclass"
                    },
                    {
                        "id": "Gettext Catalog",
                        "title": "Gettext Catalog"
                    },
                    {
                        "id": "GLSL",
                        "title": "GLSL"
                    },
                    {
                        "id": "Gluon",
                        "title": "Gluon"
                    },
                    {
                        "id": "Glyph",
                        "title": "Glyph"
                    },
                    {
                        "id": "Gnuplot",
                        "title": "Gnuplot"
                    },
                    {
                        "id": "Go",
                        "title": "Go"
                    },
                    {
                        "id": "Golo",
                        "title": "Golo"
                    },
                    {
                        "id": "Gosu",
                        "title": "Gosu"
                    },
                    {
                        "id": "Grace",
                        "title": "Grace"
                    },
                    {
                        "id": "Gradle",
                        "title": "Gradle"
                    },
                    {
                        "id": "Grammatical Framework",
                        "title": "Grammatical Framework"
                    },
                    {
                        "id": "Graph Modeling Language",
                        "title": "Graph Modeling Language"
                    },
                    {
                        "id": "Graphviz (DOT)",
                        "title": "Graphviz (DOT)"
                    },
                    {
                        "id": "Groff",
                        "title": "Groff"
                    },
                    {
                        "id": "Groovy",
                        "title": "Groovy"
                    },
                    {
                        "id": "Groovy Server Pages",
                        "title": "Groovy Server Pages"
                    },
                    {
                        "id": "GWT",
                        "title": "GWT"
                    },
                    {
                        "id": "Hack",
                        "title": "Hack"
                    },
                    {
                        "id": "Haml",
                        "title": "Haml"
                    },
                    {
                        "id": "Handlebars",
                        "title": "Handlebars"
                    },
                    {
                        "id": "Harbour",
                        "title": "Harbour"
                    },
                    {
                        "id": "Haskell",
                        "title": "Haskell"
                    },
                    {
                        "id": "Haxe",
                        "title": "Haxe"
                    },
                    {
                        "id": "HTML",
                        "title": "HTML"
                    },
                    {
                        "id": "HTML+Django",
                        "title": "HTML+Django"
                    },
                    {
                        "id": "HTML+ERB",
                        "title": "HTML+ERB"
                    },
                    {
                        "id": "HTML+PHP",
                        "title": "HTML+PHP"
                    },
                    {
                        "id": "HTTP",
                        "title": "HTTP"
                    },
                    {
                        "id": "Hy",
                        "title": "Hy"
                    },
                    {
                        "id": "HyPhy",
                        "title": "HyPhy"
                    },
                    {
                        "id": "IDL",
                        "title": "IDL"
                    },
                    {
                        "id": "Idris",
                        "title": "Idris"
                    },
                    {
                        "id": "IGOR Pro",
                        "title": "IGOR Pro"
                    },
                    {
                        "id": "Inform 7",
                        "title": "Inform 7"
                    },
                    {
                        "id": "INI",
                        "title": "INI"
                    },
                    {
                        "id": "Inno Setup",
                        "title": "Inno Setup"
                    },
                    {
                        "id": "Io",
                        "title": "Io"
                    },
                    {
                        "id": "Ioke",
                        "title": "Ioke"
                    },
                    {
                        "id": "IRC log",
                        "title": "IRC log"
                    },
                    {
                        "id": "Isabelle",
                        "title": "Isabelle"
                    },
                    {
                        "id": "Isabelle ROOT",
                        "title": "Isabelle ROOT"
                    },
                    {
                        "id": "J",
                        "title": "J"
                    },
                    {
                        "id": "Jade",
                        "title": "Jade"
                    },
                    {
                        "id": "Jasmin",
                        "title": "Jasmin"
                    },
                    {
                        "id": "Java",
                        "title": "Java"
                    },
                    {
                        "id": "Java Server Pages",
                        "title": "Java Server Pages"
                    },
                    {
                        "id": "JavaScript",
                        "title": "JavaScript"
                    },
                    {
                        "id": "JFlex",
                        "title": "JFlex"
                    },
                    {
                        "id": "JSF",
                        "title": "JSF"
                    },
                    {
                        "id": "JSON",
                        "title": "JSON"
                    },
                    {
                        "id": "JSON5",
                        "title": "JSON5"
                    },
                    {
                        "id": "JSONiq",
                        "title": "JSONiq"
                    },
                    {
                        "id": "JSONLD",
                        "title": "JSONLD"
                    },
                    {
                        "id": "Julia",
                        "title": "Julia"
                    },
                    {
                        "id": "KiCad",
                        "title": "KiCad"
                    },
                    {
                        "id": "Kit",
                        "title": "Kit"
                    },
                    {
                        "id": "Kotlin",
                        "title": "Kotlin"
                    },
                    {
                        "id": "KRL",
                        "title": "KRL"
                    },
                    {
                        "id": "LabVIEW",
                        "title": "LabVIEW"
                    },
                    {
                        "id": "Laravel",
                        "title": "Laravel"
                    },
                    {
                        "id": "Lasso",
                        "title": "Lasso"
                    },
                    {
                        "id": "Latte",
                        "title": "Latte"
                    },
                    {
                        "id": "Lean",
                        "title": "Lean"
                    },
                    {
                        "id": "Less",
                        "title": "Less"
                    },
                    {
                        "id": "Lex",
                        "title": "Lex"
                    },
                    {
                        "id": "LFE",
                        "title": "LFE"
                    },
                    {
                        "id": "LilyPond",
                        "title": "LilyPond"
                    },
                    {
                        "id": "Limbo",
                        "title": "Limbo"
                    },
                    {
                        "id": "Linker Script",
                        "title": "Linker Script"
                    },
                    {
                        "id": "Linux Kernel Module",
                        "title": "Linux Kernel Module"
                    },
                    {
                        "id": "Liquid",
                        "title": "Liquid"
                    },
                    {
                        "id": "Literate Agda",
                        "title": "Literate Agda"
                    },
                    {
                        "id": "Literate CoffeeScript",
                        "title": "Literate CoffeeScript"
                    },
                    {
                        "id": "Literate Haskell",
                        "title": "Literate Haskell"
                    },
                    {
                        "id": "LiveScript",
                        "title": "LiveScript"
                    },
                    {
                        "id": "LLVM",
                        "title": "LLVM"
                    },
                    {
                        "id": "Logos",
                        "title": "Logos"
                    },
                    {
                        "id": "Logtalk",
                        "title": "Logtalk"
                    },
                    {
                        "id": "LOLCODE",
                        "title": "LOLCODE"
                    },
                    {
                        "id": "LookML",
                        "title": "LookML"
                    },
                    {
                        "id": "LoomScript",
                        "title": "LoomScript"
                    },
                    {
                        "id": "LSL",
                        "title": "LSL"
                    },
                    {
                        "id": "Lua",
                        "title": "Lua"
                    },
                    {
                        "id": "M",
                        "title": "M"
                    },
                    {
                        "id": "Makefile",
                        "title": "Makefile"
                    },
                    {
                        "id": "Mako",
                        "title": "Mako"
                    },
                    {
                        "id": "Markdown",
                        "title": "Markdown"
                    },
                    {
                        "id": "Mask",
                        "title": "Mask"
                    },
                    {
                        "id": "Mathematica",
                        "title": "Mathematica"
                    },
                    {
                        "id": "Matlab",
                        "title": "Matlab"
                    },
                    {
                        "id": "Maven POM",
                        "title": "Maven POM"
                    },
                    {
                        "id": "Max",
                        "title": "Max"
                    },
                    {
                        "id": "MediaWiki",
                        "title": "MediaWiki"
                    },
                    {
                        "id": "Mercury",
                        "title": "Mercury"
                    },
                    {
                        "id": "MiniD",
                        "title": "MiniD"
                    },
                    {
                        "id": "Mirah",
                        "title": "Mirah"
                    },
                    {
                        "id": "MochiKit",
                        "title": "MochiKit"
                    },
                    {
                        "id": "Modelica",
                        "title": "Modelica"
                    },
                    {
                        "id": "Modula-2",
                        "title": "Modula-2"
                    },
                    {
                        "id": "Module Management System",
                        "title": "Module Management System"
                    },
                    {
                        "id": "Monkey",
                        "title": "Monkey"
                    },
                    {
                        "id": "Moocode",
                        "title": "Moocode"
                    },
                    {
                        "id": "MoonScript",
                        "title": "MoonScript"
                    },
                    {
                        "id": "Mootools",
                        "title": "Mootools"
                    },
                    {
                        "id": "MTML",
                        "title": "MTML"
                    },
                    {
                        "id": "MUF",
                        "title": "MUF"
                    },
                    {
                        "id": "mupad",
                        "title": "mupad"
                    },
                    {
                        "id": "Myghty",
                        "title": "Myghty"
                    },
                    {
                        "id": "NCL",
                        "title": "NCL"
                    },
                    {
                        "id": "Nemerle",
                        "title": "Nemerle"
                    },
                    {
                        "id": "nesC",
                        "title": "nesC"
                    },
                    {
                        "id": "NetLinx",
                        "title": "NetLinx"
                    },
                    {
                        "id": "NetLinx+ERB",
                        "title": "NetLinx+ERB"
                    },
                    {
                        "id": "NetLogo",
                        "title": "NetLogo"
                    },
                    {
                        "id": "NewLisp",
                        "title": "NewLisp"
                    },
                    {
                        "id": "Nginx",
                        "title": "Nginx"
                    },
                    {
                        "id": "Nimrod",
                        "title": "Nimrod"
                    },
                    {
                        "id": "Ninja",
                        "title": "Ninja"
                    },
                    {
                        "id": "Nit",
                        "title": "Nit"
                    },
                    {
                        "id": "Nitro",
                        "title": "Nitro"
                    },
                    {
                        "id": "Nix",
                        "title": "Nix"
                    },
                    {
                        "id": "NL",
                        "title": "NL"
                    },
                    {
                        "id": "Node",
                        "title": "Node"
                    },
                    {
                        "id": "NSIS",
                        "title": "NSIS"
                    },
                    {
                        "id": "Nu",
                        "title": "Nu"
                    },
                    {
                        "id": "NumPy",
                        "title": "NumPy"
                    },
                    {
                        "id": "ObjDump",
                        "title": "ObjDump"
                    },
                    {
                        "id": "Objective-C",
                        "title": "Objective-C"
                    },
                    {
                        "id": "Objective-C++",
                        "title": "Objective-C++"
                    },
                    {
                        "id": "Objective-J",
                        "title": "Objective-J"
                    },
                    {
                        "id": "OCaml",
                        "title": "OCaml"
                    },
                    {
                        "id": "Omgrofl",
                        "title": "Omgrofl"
                    },
                    {
                        "id": "ooc",
                        "title": "ooc"
                    },
                    {
                        "id": "Opa",
                        "title": "Opa"
                    },
                    {
                        "id": "Opal",
                        "title": "Opal"
                    },
                    {
                        "id": "OpenCL",
                        "title": "OpenCL"
                    },
                    {
                        "id": "OpenEdge ABL",
                        "title": "OpenEdge ABL"
                    },
                    {
                        "id": "OpenSCAD",
                        "title": "OpenSCAD"
                    },
                    {
                        "id": "Org",
                        "title": "Org"
                    },
                    {
                        "id": "Ox",
                        "title": "Ox"
                    },
                    {
                        "id": "Oxygene",
                        "title": "Oxygene"
                    },
                    {
                        "id": "Oz",
                        "title": "Oz"
                    },
                    {
                        "id": "Pan",
                        "title": "Pan"
                    },
                    {
                        "id": "Papyrus",
                        "title": "Papyrus"
                    },
                    {
                        "id": "Parrot",
                        "title": "Parrot"
                    },
                    {
                        "id": "Parrot Assembly",
                        "title": "Parrot Assembly"
                    },
                    {
                        "id": "Parrot Internal Representation",
                        "title": "Parrot Internal Representation"
                    },
                    {
                        "id": "Pascal",
                        "title": "Pascal"
                    },
                    {
                        "id": "PAWN",
                        "title": "PAWN"
                    },
                    {
                        "id": "Perl",
                        "title": "Perl"
                    },
                    {
                        "id": "Perl6",
                        "title": "Perl6"
                    },
                    {
                        "id": "PHP",
                        "title": "PHP"
                    },
                    {
                        "id": "PicoLisp",
                        "title": "PicoLisp"
                    },
                    {
                        "id": "PigLatin",
                        "title": "PigLatin"
                    },
                    {
                        "id": "Pike",
                        "title": "Pike"
                    },
                    {
                        "id": "PLpgSQL",
                        "title": "PLpgSQL"
                    },
                    {
                        "id": "PLSQL",
                        "title": "PLSQL"
                    },
                    {
                        "id": "Pod",
                        "title": "Pod"
                    },
                    {
                        "id": "PogoScript",
                        "title": "PogoScript"
                    },
                    {
                        "id": "PostScript",
                        "title": "PostScript"
                    },
                    {
                        "id": "PowerShell",
                        "title": "PowerShell"
                    },
                    {
                        "id": "Prado",
                        "title": "Prado"
                    },
                    {
                        "id": "Processing",
                        "title": "Processing"
                    },
                    {
                        "id": "Prolog",
                        "title": "Prolog"
                    },
                    {
                        "id": "Propeller Spin",
                        "title": "Propeller Spin"
                    },
                    {
                        "id": "Protocol Buffer",
                        "title": "Protocol Buffer"
                    },
                    {
                        "id": "Protoype",
                        "title": "Protoype"
                    },
                    {
                        "id": "Public Key",
                        "title": "Public Key"
                    },
                    {
                        "id": "Puppet",
                        "title": "Puppet"
                    },
                    {
                        "id": "Pure Data",
                        "title": "Pure Data"
                    },
                    {
                        "id": "PureBasic",
                        "title": "PureBasic"
                    },
                    {
                        "id": "PureScript",
                        "title": "PureScript"
                    },
                    {
                        "id": "Pylons",
                        "title": "Pylons"
                    },
                    {
                        "id": "Python",
                        "title": "Python"
                    },
                    {
                        "id": "Python traceback",
                        "title": "Python traceback"
                    },
                    {
                        "id": "QMake",
                        "title": "QMake"
                    },
                    {
                        "id": "QML",
                        "title": "QML"
                    },
                    {
                        "id": "R",
                        "title": "R"
                    },
                    {
                        "id": "Racket",
                        "title": "Racket"
                    },
                    {
                        "id": "Ragel in Ruby Host",
                        "title": "Ragel in Ruby Host"
                    },
                    {
                        "id": "Rails",
                        "title": "Rails"
                    },
                    {
                        "id": "Ramaze",
                        "title": "Ramaze"
                    },
                    {
                        "id": "RAML",
                        "title": "RAML"
                    },
                    {
                        "id": "Raw token data",
                        "title": "Raw token data"
                    },
                    {
                        "id": "RDoc",
                        "title": "RDoc"
                    },
                    {
                        "id": "React",
                        "title": "React"
                    },
                    {
                        "id": "REALbasic",
                        "title": "REALbasic"
                    },
                    {
                        "id": "Rebol",
                        "title": "Rebol"
                    },
                    {
                        "id": "Red",
                        "title": "Red"
                    },
                    {
                        "id": "Redcode",
                        "title": "Redcode"
                    },
                    {
                        "id": "RenderScript",
                        "title": "RenderScript"
                    },
                    {
                        "id": "reStructuredText",
                        "title": "reStructuredText"
                    },
                    {
                        "id": "RHTML",
                        "title": "RHTML"
                    },
                    {
                        "id": "RMarkdown",
                        "title": "RMarkdown"
                    },
                    {
                        "id": "RobotFramework",
                        "title": "RobotFramework"
                    },
                    {
                        "id": "Rouge",
                        "title": "Rouge"
                    },
                    {
                        "id": "Ruby",
                        "title": "Ruby"
                    },
                    {
                        "id": "Rust",
                        "title": "Rust"
                    },
                    {
                        "id": "Sage",
                        "title": "Sage"
                    },
                    {
                        "id": "SaltStack",
                        "title": "SaltStack"
                    },
                    {
                        "id": "SAS",
                        "title": "SAS"
                    },
                    {
                        "id": "Sass",
                        "title": "Sass"
                    },
                    {
                        "id": "Sass",
                        "title": "Sass"
                    },
                    {
                        "id": "Scala",
                        "title": "Scala"
                    },
                    {
                        "id": "Scaml",
                        "title": "Scaml"
                    },
                    {
                        "id": "Scheme",
                        "title": "Scheme"
                    },
                    {
                        "id": "Scilab",
                        "title": "Scilab"
                    },
                    {
                        "id": "script.aculo.us",
                        "title": "script.aculo.us"
                    },
                    {
                        "id": "SCSS",
                        "title": "SCSS"
                    },
                    {
                        "id": "Self",
                        "title": "Self"
                    },
                    {
                        "id": "Shell",
                        "title": "Shell"
                    },
                    {
                        "id": "ShellSession",
                        "title": "ShellSession"
                    },
                    {
                        "id": "Shen",
                        "title": "Shen"
                    },
                    {
                        "id": "Slash",
                        "title": "Slash"
                    },
                    {
                        "id": "Slim",
                        "title": "Slim"
                    },
                    {
                        "id": "Smali",
                        "title": "Smali"
                    },
                    {
                        "id": "Smalltalk",
                        "title": "Smalltalk"
                    },
                    {
                        "id": "Smarty",
                        "title": "Smarty"
                    },
                    {
                        "id": "SMT",
                        "title": "SMT"
                    },
                    {
                        "id": "SourcePawn",
                        "title": "SourcePawn"
                    },
                    {
                        "id": "SPARQL",
                        "title": "SPARQL"
                    },
                    {
                        "id": "Spring",
                        "title": "Spring"
                    },
                    {
                        "id": "Spry",
                        "title": "Spry"
                    },
                    {
                        "id": "SQF",
                        "title": "SQF"
                    },
                    {
                        "id": "SQL",
                        "title": "SQL"
                    },
                    {
                        "id": "SQLPL",
                        "title": "SQLPL"
                    },
                    {
                        "id": "Squirrel",
                        "title": "Squirrel"
                    },
                    {
                        "id": "Standard ML",
                        "title": "Standard ML"
                    },
                    {
                        "id": "Stata",
                        "title": "Stata"
                    },
                    {
                        "id": "STON",
                        "title": "STON"
                    },
                    {
                        "id": "Struts",
                        "title": "Struts"
                    },
                    {
                        "id": "Stylus",
                        "title": "Stylus"
                    },
                    {
                        "id": "SuperCollider",
                        "title": "SuperCollider"
                    },
                    {
                        "id": "SVG",
                        "title": "SVG"
                    },
                    {
                        "id": "Swift",
                        "title": "Swift"
                    },
                    {
                        "id": "Symfony",
                        "title": "Symfony"
                    },
                    {
                        "id": "SystemVerilog",
                        "title": "SystemVerilog"
                    },
                    {
                        "id": "Tcl",
                        "title": "Tcl"
                    },
                    {
                        "id": "Tcsh",
                        "title": "Tcsh"
                    },
                    {
                        "id": "Tea",
                        "title": "Tea"
                    },
                    {
                        "id": "TeX",
                        "title": "TeX"
                    },
                    {
                        "id": "Text",
                        "title": "Text"
                    },
                    {
                        "id": "Textile",
                        "title": "Textile"
                    },
                    {
                        "id": "Thrift",
                        "title": "Thrift"
                    },
                    {
                        "id": "TOML",
                        "title": "TOML"
                    },
                    {
                        "id": "TurboGears",
                        "title": "TurboGears"
                    },
                    {
                        "id": "Turing",
                        "title": "Turing"
                    },
                    {
                        "id": "Turtle",
                        "title": "Turtle"
                    },
                    {
                        "id": "Twig",
                        "title": "Twig"
                    },
                    {
                        "id": "TXL",
                        "title": "TXL"
                    },
                    {
                        "id": "TypeScript",
                        "title": "TypeScript"
                    },
                    {
                        "id": "Unified Parallel C",
                        "title": "Unified Parallel C"
                    },
                    {
                        "id": "Unity3D Asset",
                        "title": "Unity3D Asset"
                    },
                    {
                        "id": "UnrealScript",
                        "title": "UnrealScript"
                    },
                    {
                        "id": "Vala",
                        "title": "Vala"
                    },
                    {
                        "id": "VCL",
                        "title": "VCL"
                    },
                    {
                        "id": "Verilog",
                        "title": "Verilog"
                    },
                    {
                        "id": "VHDL",
                        "title": "VHDL"
                    },
                    {
                        "id": "VimL",
                        "title": "VimL"
                    },
                    {
                        "id": "Visual Basic",
                        "title": "Visual Basic"
                    },
                    {
                        "id": "Volt",
                        "title": "Volt"
                    },
                    {
                        "id": "Web Ontology Language",
                        "title": "Web Ontology Language"
                    },
                    {
                        "id": "WebIDL",
                        "title": "WebIDL"
                    },
                    {
                        "id": "wisp",
                        "title": "wisp"
                    },
                    {
                        "id": "xBase",
                        "title": "xBase"
                    },
                    {
                        "id": "XC",
                        "title": "XC"
                    },
                    {
                        "id": "XML",
                        "title": "XML"
                    },
                    {
                        "id": "Xojo",
                        "title": "Xojo"
                    },
                    {
                        "id": "XProc",
                        "title": "XProc"
                    },
                    {
                        "id": "XQuery",
                        "title": "XQuery"
                    },
                    {
                        "id": "XS",
                        "title": "XS"
                    },
                    {
                        "id": "XSLT",
                        "title": "XSLT"
                    },
                    {
                        "id": "Xtend",
                        "title": "Xtend"
                    },
                    {
                        "id": "Yacc",
                        "title": "Yacc"
                    },
                    {
                        "id": "YAML",
                        "title": "YAML"
                    },
                    {
                        "id": "YAML",
                        "title": "YAML"
                    },
                    {
                        "id": "Zend",
                        "title": "Zend"
                    },
                    {
                        "id": "Zephir",
                        "title": "Zephir"
                    },
                    {
                        "id": "Zimpl",
                        "title": "Zimpl"
                    }
                ],

                langMap: {".NET":{"id":".NET","title":".NET"},"ABAP":{"id":"ABAP","title":"ABAP"},"ActionScript":{"id":"ActionScript","title":"ActionScript"},"Ada":{"id":"Ada","title":"Ada"},"Agavi":{"id":"Agavi","title":"Agavi"},"Agda":{"id":"Agda","title":"Agda"},"AGS Script":{"id":"AGS Script","title":"AGS Script"},"Akelos":{"id":"Akelos","title":"Akelos"},"Alloy":{"id":"Alloy","title":"Alloy"},"AMPL":{"id":"AMPL","title":"AMPL"},"Android":{"id":"Android","title":"Android"},"Angular":{"id":"Angular","title":"Angular"},"Ant Build System":{"id":"Ant Build System","title":"Ant Build System"},"ANTLR":{"id":"ANTLR","title":"ANTLR"},"ApacheConf":{"id":"ApacheConf","title":"ApacheConf"},"Apex":{"id":"Apex","title":"Apex"},"API Blueprint":{"id":"API Blueprint","title":"API Blueprint"},"APL":{"id":"APL","title":"APL"},"AppFuse":{"id":"AppFuse","title":"AppFuse"},"AppleScript":{"id":"AppleScript","title":"AppleScript"},"Aranea":{"id":"Aranea","title":"Aranea"},"Arc":{"id":"Arc","title":"Arc"},"Arduino":{"id":"Arduino","title":"Arduino"},"AsciiDoc":{"id":"AsciiDoc","title":"AsciiDoc"},"ASP":{"id":"ASP","title":"ASP"},"ASP.NET":{"id":"ASP.NET","title":"ASP.NET"},"AspectJ":{"id":"AspectJ","title":"AspectJ"},"Assembly":{"id":"Assembly","title":"Assembly"},"ATS":{"id":"ATS","title":"ATS"},"Augeas":{"id":"Augeas","title":"Augeas"},"AutoHotkey":{"id":"AutoHotkey","title":"AutoHotkey"},"AutoIt":{"id":"AutoIt","title":"AutoIt"},"Awk":{"id":"Awk","title":"Awk"},"Backbone":{"id":"Backbone","title":"Backbone"},"Barebones":{"id":"Barebones","title":"Barebones"},"Bash":{"id":"Bash","title":"Bash"},"Batchfile":{"id":"Batchfile","title":"Batchfile"},"Befunge":{"id":"Befunge","title":"Befunge"},"Bison":{"id":"Bison","title":"Bison"},"BitBake":{"id":"BitBake","title":"BitBake"},"BlitzBasic":{"id":"BlitzBasic","title":"BlitzBasic"},"BlitzMax":{"id":"BlitzMax","title":"BlitzMax"},"Blueprint":{"id":"Blueprint","title":"Blueprint"},"Bluespec":{"id":"Bluespec","title":"Bluespec"},"Boo":{"id":"Boo","title":"Boo"},"Brainfuck":{"id":"Brainfuck","title":"Brainfuck"},"Brightscript":{"id":"Brightscript","title":"Brightscript"},"Bro":{"id":"Bro","title":"Bro"},"C":{"id":"C","title":"C"},"C#":{"id":"C#","title":"C#"},"C++":{"id":"C++","title":"C++"},"C-ObjDump":{"id":"C-ObjDump","title":"C-ObjDump"},"C2hs Haskell":{"id":"C2hs Haskell","title":"C2hs Haskell"},"CakePHP":{"id":"CakePHP","title":"CakePHP"},"Camping":{"id":"Camping","title":"Camping"},"Cap'n Proto":{"id":"Cap'n Proto","title":"Cap'n Proto"},"CartoCSS":{"id":"CartoCSS","title":"CartoCSS"},"Ceylon":{"id":"Ceylon","title":"Ceylon"},"Chapel":{"id":"Chapel","title":"Chapel"},"ChucK":{"id":"ChucK","title":"ChucK"},"Cirru":{"id":"Cirru","title":"Cirru"},"Clarion":{"id":"Clarion","title":"Clarion"},"Clean":{"id":"Clean","title":"Clean"},"CLIPS":{"id":"CLIPS","title":"CLIPS"},"Clojure":{"id":"Clojure","title":"Clojure"},"CMake":{"id":"CMake","title":"CMake"},"COBOL":{"id":"COBOL","title":"COBOL"},"Cocoon":{"id":"Cocoon","title":"Cocoon"},"CodeIgniter":{"id":"CodeIgniter","title":"CodeIgniter"},"CoffeeScript":{"id":"CoffeeScript","title":"CoffeeScript"},"ColdFusion":{"id":"ColdFusion","title":"ColdFusion"},"ColdFusion CFC":{"id":"ColdFusion CFC","title":"ColdFusion CFC"},"Common Lisp":{"id":"Common Lisp","title":"Common Lisp"},"Component Pascal":{"id":"Component Pascal","title":"Component Pascal"},"Cool":{"id":"Cool","title":"Cool"},"Coq":{"id":"Coq","title":"Coq"},"Cpp-ObjDump":{"id":"Cpp-ObjDump","title":"Cpp-ObjDump"},"Creole":{"id":"Creole","title":"Creole"},"Crystal":{"id":"Crystal","title":"Crystal"},"CSS":{"id":"CSS","title":"CSS"},"Cucumber":{"id":"Cucumber","title":"Cucumber"},"Cuda":{"id":"Cuda","title":"Cuda"},"Cycript":{"id":"Cycript","title":"Cycript"},"Cython":{"id":"Cython","title":"Cython"},"D":{"id":"D","title":"D"},"D-ObjDump":{"id":"D-ObjDump","title":"D-ObjDump"},"Darcs Patch":{"id":"Darcs Patch","title":"Darcs Patch"},"Dart":{"id":"Dart","title":"Dart"},"desktop":{"id":"desktop","title":"desktop"},"Diff":{"id":"Diff","title":"Diff"},"DIGITAL Command Language":{"id":"DIGITAL Command Language","title":"DIGITAL Command Language"},"Django":{"id":"Django","title":"Django"},"DM":{"id":"DM","title":"DM"},"Dockerfile":{"id":"Dockerfile","title":"Dockerfile"},"Dogescript":{"id":"Dogescript","title":"Dogescript"},"Dojo":{"id":"Dojo","title":"Dojo"},"DTrace":{"id":"DTrace","title":"DTrace"},"Dylan":{"id":"Dylan","title":"Dylan"},"E":{"id":"E","title":"E"},"Eagle":{"id":"Eagle","title":"Eagle"},"eC":{"id":"eC","title":"eC"},"Ecere Projects":{"id":"Ecere Projects","title":"Ecere Projects"},"ECL":{"id":"ECL","title":"ECL"},"edn":{"id":"edn","title":"edn"},"Eiffel":{"id":"Eiffel","title":"Eiffel"},"Elixir":{"id":"Elixir","title":"Elixir"},"Elm":{"id":"Elm","title":"Elm"},"Emacs Lisp":{"id":"Emacs Lisp","title":"Emacs Lisp"},"Ember":{"id":"Ember","title":"Ember"},"EmberScript":{"id":"EmberScript","title":"EmberScript"},"Erlang":{"id":"Erlang","title":"Erlang"},"Express":{"id":"Express","title":"Express"},"ExtJS":{"id":"ExtJS","title":"ExtJS"},"F#":{"id":"F#","title":"F#"},"Factor":{"id":"Factor","title":"Factor"},"Famo.us":{"id":"Famo.us","title":"Famo.us"},"Fancy":{"id":"Fancy","title":"Fancy"},"Fantom":{"id":"Fantom","title":"Fantom"},"Filterscript":{"id":"Filterscript","title":"Filterscript"},"fish":{"id":"fish","title":"fish"},"Flask":{"id":"Flask","title":"Flask"},"FLUX":{"id":"FLUX","title":"FLUX"},"Formatted":{"id":"Formatted","title":"Formatted"},"Forth":{"id":"Forth","title":"Forth"},"FORTRAN":{"id":"FORTRAN","title":"FORTRAN"},"Frege":{"id":"Frege","title":"Frege"},"G-code":{"id":"G-code","title":"G-code"},"Game Maker Language":{"id":"Game Maker Language","title":"Game Maker Language"},"GAMS":{"id":"GAMS","title":"GAMS"},"GAP":{"id":"GAP","title":"GAP"},"GAS":{"id":"GAS","title":"GAS"},"GDScript":{"id":"GDScript","title":"GDScript"},"Genshi":{"id":"Genshi","title":"Genshi"},"Gentoo Ebuild":{"id":"Gentoo Ebuild","title":"Gentoo Ebuild"},"Gentoo Eclass":{"id":"Gentoo Eclass","title":"Gentoo Eclass"},"Gettext Catalog":{"id":"Gettext Catalog","title":"Gettext Catalog"},"GLSL":{"id":"GLSL","title":"GLSL"},"Gluon":{"id":"Gluon","title":"Gluon"},"Glyph":{"id":"Glyph","title":"Glyph"},"Gnuplot":{"id":"Gnuplot","title":"Gnuplot"},"Go":{"id":"Go","title":"Go"},"Golo":{"id":"Golo","title":"Golo"},"Gosu":{"id":"Gosu","title":"Gosu"},"Grace":{"id":"Grace","title":"Grace"},"Gradle":{"id":"Gradle","title":"Gradle"},"Grammatical Framework":{"id":"Grammatical Framework","title":"Grammatical Framework"},"Graph Modeling Language":{"id":"Graph Modeling Language","title":"Graph Modeling Language"},"Graphviz (DOT)":{"id":"Graphviz (DOT)","title":"Graphviz (DOT)"},"Groff":{"id":"Groff","title":"Groff"},"Groovy":{"id":"Groovy","title":"Groovy"},"Groovy Server Pages":{"id":"Groovy Server Pages","title":"Groovy Server Pages"},"GWT":{"id":"GWT","title":"GWT"},"Hack":{"id":"Hack","title":"Hack"},"Haml":{"id":"Haml","title":"Haml"},"Handlebars":{"id":"Handlebars","title":"Handlebars"},"Harbour":{"id":"Harbour","title":"Harbour"},"Haskell":{"id":"Haskell","title":"Haskell"},"Haxe":{"id":"Haxe","title":"Haxe"},"HTML":{"id":"HTML","title":"HTML"},"HTML+Django":{"id":"HTML+Django","title":"HTML+Django"},"HTML+ERB":{"id":"HTML+ERB","title":"HTML+ERB"},"HTML+PHP":{"id":"HTML+PHP","title":"HTML+PHP"},"HTTP":{"id":"HTTP","title":"HTTP"},"Hy":{"id":"Hy","title":"Hy"},"HyPhy":{"id":"HyPhy","title":"HyPhy"},"IDL":{"id":"IDL","title":"IDL"},"Idris":{"id":"Idris","title":"Idris"},"IGOR Pro":{"id":"IGOR Pro","title":"IGOR Pro"},"Inform 7":{"id":"Inform 7","title":"Inform 7"},"INI":{"id":"INI","title":"INI"},"Inno Setup":{"id":"Inno Setup","title":"Inno Setup"},"Io":{"id":"Io","title":"Io"},"Ioke":{"id":"Ioke","title":"Ioke"},"IRC log":{"id":"IRC log","title":"IRC log"},"Isabelle":{"id":"Isabelle","title":"Isabelle"},"Isabelle ROOT":{"id":"Isabelle ROOT","title":"Isabelle ROOT"},"J":{"id":"J","title":"J"},"Jade":{"id":"Jade","title":"Jade"},"Jasmin":{"id":"Jasmin","title":"Jasmin"},"Java":{"id":"Java","title":"Java"},"Java Server Pages":{"id":"Java Server Pages","title":"Java Server Pages"},"JavaScript":{"id":"JavaScript","title":"JavaScript"},"JFlex":{"id":"JFlex","title":"JFlex"},"JSF":{"id":"JSF","title":"JSF"},"JSON":{"id":"JSON","title":"JSON"},"JSON5":{"id":"JSON5","title":"JSON5"},"JSONiq":{"id":"JSONiq","title":"JSONiq"},"JSONLD":{"id":"JSONLD","title":"JSONLD"},"Julia":{"id":"Julia","title":"Julia"},"KiCad":{"id":"KiCad","title":"KiCad"},"Kit":{"id":"Kit","title":"Kit"},"Kotlin":{"id":"Kotlin","title":"Kotlin"},"KRL":{"id":"KRL","title":"KRL"},"LabVIEW":{"id":"LabVIEW","title":"LabVIEW"},"Laravel":{"id":"Laravel","title":"Laravel"},"Lasso":{"id":"Lasso","title":"Lasso"},"Latte":{"id":"Latte","title":"Latte"},"Lean":{"id":"Lean","title":"Lean"},"Less":{"id":"Less","title":"Less"},"Lex":{"id":"Lex","title":"Lex"},"LFE":{"id":"LFE","title":"LFE"},"LilyPond":{"id":"LilyPond","title":"LilyPond"},"Limbo":{"id":"Limbo","title":"Limbo"},"Linker Script":{"id":"Linker Script","title":"Linker Script"},"Linux Kernel Module":{"id":"Linux Kernel Module","title":"Linux Kernel Module"},"Liquid":{"id":"Liquid","title":"Liquid"},"Literate Agda":{"id":"Literate Agda","title":"Literate Agda"},"Literate CoffeeScript":{"id":"Literate CoffeeScript","title":"Literate CoffeeScript"},"Literate Haskell":{"id":"Literate Haskell","title":"Literate Haskell"},"LiveScript":{"id":"LiveScript","title":"LiveScript"},"LLVM":{"id":"LLVM","title":"LLVM"},"Logos":{"id":"Logos","title":"Logos"},"Logtalk":{"id":"Logtalk","title":"Logtalk"},"LOLCODE":{"id":"LOLCODE","title":"LOLCODE"},"LookML":{"id":"LookML","title":"LookML"},"LoomScript":{"id":"LoomScript","title":"LoomScript"},"LSL":{"id":"LSL","title":"LSL"},"Lua":{"id":"Lua","title":"Lua"},"M":{"id":"M","title":"M"},"Makefile":{"id":"Makefile","title":"Makefile"},"Mako":{"id":"Mako","title":"Mako"},"Markdown":{"id":"Markdown","title":"Markdown"},"Mask":{"id":"Mask","title":"Mask"},"Mathematica":{"id":"Mathematica","title":"Mathematica"},"Matlab":{"id":"Matlab","title":"Matlab"},"Maven POM":{"id":"Maven POM","title":"Maven POM"},"Max":{"id":"Max","title":"Max"},"MediaWiki":{"id":"MediaWiki","title":"MediaWiki"},"Mercury":{"id":"Mercury","title":"Mercury"},"MiniD":{"id":"MiniD","title":"MiniD"},"Mirah":{"id":"Mirah","title":"Mirah"},"MochiKit":{"id":"MochiKit","title":"MochiKit"},"Modelica":{"id":"Modelica","title":"Modelica"},"Modula-2":{"id":"Modula-2","title":"Modula-2"},"Module Management System":{"id":"Module Management System","title":"Module Management System"},"Monkey":{"id":"Monkey","title":"Monkey"},"Moocode":{"id":"Moocode","title":"Moocode"},"MoonScript":{"id":"MoonScript","title":"MoonScript"},"Mootools":{"id":"Mootools","title":"Mootools"},"MTML":{"id":"MTML","title":"MTML"},"MUF":{"id":"MUF","title":"MUF"},"mupad":{"id":"mupad","title":"mupad"},"Myghty":{"id":"Myghty","title":"Myghty"},"NCL":{"id":"NCL","title":"NCL"},"Nemerle":{"id":"Nemerle","title":"Nemerle"},"nesC":{"id":"nesC","title":"nesC"},"NetLinx":{"id":"NetLinx","title":"NetLinx"},"NetLinx+ERB":{"id":"NetLinx+ERB","title":"NetLinx+ERB"},"NetLogo":{"id":"NetLogo","title":"NetLogo"},"NewLisp":{"id":"NewLisp","title":"NewLisp"},"Nginx":{"id":"Nginx","title":"Nginx"},"Nimrod":{"id":"Nimrod","title":"Nimrod"},"Ninja":{"id":"Ninja","title":"Ninja"},"Nit":{"id":"Nit","title":"Nit"},"Nitro":{"id":"Nitro","title":"Nitro"},"Nix":{"id":"Nix","title":"Nix"},"NL":{"id":"NL","title":"NL"},"Node":{"id":"Node","title":"Node"},"NSIS":{"id":"NSIS","title":"NSIS"},"Nu":{"id":"Nu","title":"Nu"},"NumPy":{"id":"NumPy","title":"NumPy"},"ObjDump":{"id":"ObjDump","title":"ObjDump"},"Objective-C":{"id":"Objective-C","title":"Objective-C"},"Objective-C++":{"id":"Objective-C++","title":"Objective-C++"},"Objective-J":{"id":"Objective-J","title":"Objective-J"},"OCaml":{"id":"OCaml","title":"OCaml"},"Omgrofl":{"id":"Omgrofl","title":"Omgrofl"},"ooc":{"id":"ooc","title":"ooc"},"Opa":{"id":"Opa","title":"Opa"},"Opal":{"id":"Opal","title":"Opal"},"OpenCL":{"id":"OpenCL","title":"OpenCL"},"OpenEdge ABL":{"id":"OpenEdge ABL","title":"OpenEdge ABL"},"OpenSCAD":{"id":"OpenSCAD","title":"OpenSCAD"},"Org":{"id":"Org","title":"Org"},"Ox":{"id":"Ox","title":"Ox"},"Oxygene":{"id":"Oxygene","title":"Oxygene"},"Oz":{"id":"Oz","title":"Oz"},"Pan":{"id":"Pan","title":"Pan"},"Papyrus":{"id":"Papyrus","title":"Papyrus"},"Parrot":{"id":"Parrot","title":"Parrot"},"Parrot Assembly":{"id":"Parrot Assembly","title":"Parrot Assembly"},"Parrot Internal Representation":{"id":"Parrot Internal Representation","title":"Parrot Internal Representation"},"Pascal":{"id":"Pascal","title":"Pascal"},"PAWN":{"id":"PAWN","title":"PAWN"},"Perl":{"id":"Perl","title":"Perl"},"Perl6":{"id":"Perl6","title":"Perl6"},"PHP":{"id":"PHP","title":"PHP"},"PicoLisp":{"id":"PicoLisp","title":"PicoLisp"},"PigLatin":{"id":"PigLatin","title":"PigLatin"},"Pike":{"id":"Pike","title":"Pike"},"PLpgSQL":{"id":"PLpgSQL","title":"PLpgSQL"},"PLSQL":{"id":"PLSQL","title":"PLSQL"},"Pod":{"id":"Pod","title":"Pod"},"PogoScript":{"id":"PogoScript","title":"PogoScript"},"PostScript":{"id":"PostScript","title":"PostScript"},"PowerShell":{"id":"PowerShell","title":"PowerShell"},"Prado":{"id":"Prado","title":"Prado"},"Processing":{"id":"Processing","title":"Processing"},"Prolog":{"id":"Prolog","title":"Prolog"},"Propeller Spin":{"id":"Propeller Spin","title":"Propeller Spin"},"Protocol Buffer":{"id":"Protocol Buffer","title":"Protocol Buffer"},"Protoype":{"id":"Protoype","title":"Protoype"},"Public Key":{"id":"Public Key","title":"Public Key"},"Puppet":{"id":"Puppet","title":"Puppet"},"Pure Data":{"id":"Pure Data","title":"Pure Data"},"PureBasic":{"id":"PureBasic","title":"PureBasic"},"PureScript":{"id":"PureScript","title":"PureScript"},"Pylons":{"id":"Pylons","title":"Pylons"},"Python":{"id":"Python","title":"Python"},"Python traceback":{"id":"Python traceback","title":"Python traceback"},"QMake":{"id":"QMake","title":"QMake"},"QML":{"id":"QML","title":"QML"},"R":{"id":"R","title":"R"},"Racket":{"id":"Racket","title":"Racket"},"Ragel in Ruby Host":{"id":"Ragel in Ruby Host","title":"Ragel in Ruby Host"},"Rails":{"id":"Rails","title":"Rails"},"Ramaze":{"id":"Ramaze","title":"Ramaze"},"RAML":{"id":"RAML","title":"RAML"},"Raw token data":{"id":"Raw token data","title":"Raw token data"},"RDoc":{"id":"RDoc","title":"RDoc"},"React":{"id":"React","title":"React"},"REALbasic":{"id":"REALbasic","title":"REALbasic"},"Rebol":{"id":"Rebol","title":"Rebol"},"Red":{"id":"Red","title":"Red"},"Redcode":{"id":"Redcode","title":"Redcode"},"RenderScript":{"id":"RenderScript","title":"RenderScript"},"reStructuredText":{"id":"reStructuredText","title":"reStructuredText"},"RHTML":{"id":"RHTML","title":"RHTML"},"RMarkdown":{"id":"RMarkdown","title":"RMarkdown"},"RobotFramework":{"id":"RobotFramework","title":"RobotFramework"},"Rouge":{"id":"Rouge","title":"Rouge"},"Ruby":{"id":"Ruby","title":"Ruby"},"Rust":{"id":"Rust","title":"Rust"},"Sage":{"id":"Sage","title":"Sage"},"SaltStack":{"id":"SaltStack","title":"SaltStack"},"SAS":{"id":"SAS","title":"SAS"},"Sass":{"id":"Sass","title":"Sass"},"Scala":{"id":"Scala","title":"Scala"},"Scaml":{"id":"Scaml","title":"Scaml"},"Scheme":{"id":"Scheme","title":"Scheme"},"Scilab":{"id":"Scilab","title":"Scilab"},"script.aculo.us":{"id":"script.aculo.us","title":"script.aculo.us"},"SCSS":{"id":"SCSS","title":"SCSS"},"Self":{"id":"Self","title":"Self"},"Shell":{"id":"Shell","title":"Shell"},"ShellSession":{"id":"ShellSession","title":"ShellSession"},"Shen":{"id":"Shen","title":"Shen"},"Slash":{"id":"Slash","title":"Slash"},"Slim":{"id":"Slim","title":"Slim"},"Smali":{"id":"Smali","title":"Smali"},"Smalltalk":{"id":"Smalltalk","title":"Smalltalk"},"Smarty":{"id":"Smarty","title":"Smarty"},"SMT":{"id":"SMT","title":"SMT"},"SourcePawn":{"id":"SourcePawn","title":"SourcePawn"},"SPARQL":{"id":"SPARQL","title":"SPARQL"},"Spring":{"id":"Spring","title":"Spring"},"Spry":{"id":"Spry","title":"Spry"},"SQF":{"id":"SQF","title":"SQF"},"SQL":{"id":"SQL","title":"SQL"},"SQLPL":{"id":"SQLPL","title":"SQLPL"},"Squirrel":{"id":"Squirrel","title":"Squirrel"},"Standard ML":{"id":"Standard ML","title":"Standard ML"},"Stata":{"id":"Stata","title":"Stata"},"STON":{"id":"STON","title":"STON"},"Struts":{"id":"Struts","title":"Struts"},"Stylus":{"id":"Stylus","title":"Stylus"},"SuperCollider":{"id":"SuperCollider","title":"SuperCollider"},"SVG":{"id":"SVG","title":"SVG"},"Swift":{"id":"Swift","title":"Swift"},"Symfony":{"id":"Symfony","title":"Symfony"},"SystemVerilog":{"id":"SystemVerilog","title":"SystemVerilog"},"Tcl":{"id":"Tcl","title":"Tcl"},"Tcsh":{"id":"Tcsh","title":"Tcsh"},"Tea":{"id":"Tea","title":"Tea"},"TeX":{"id":"TeX","title":"TeX"},"Text":{"id":"Text","title":"Text"},"Textile":{"id":"Textile","title":"Textile"},"Thrift":{"id":"Thrift","title":"Thrift"},"TOML":{"id":"TOML","title":"TOML"},"TurboGears":{"id":"TurboGears","title":"TurboGears"},"Turing":{"id":"Turing","title":"Turing"},"Turtle":{"id":"Turtle","title":"Turtle"},"Twig":{"id":"Twig","title":"Twig"},"TXL":{"id":"TXL","title":"TXL"},"TypeScript":{"id":"TypeScript","title":"TypeScript"},"Unified Parallel C":{"id":"Unified Parallel C","title":"Unified Parallel C"},"Unity3D Asset":{"id":"Unity3D Asset","title":"Unity3D Asset"},"UnrealScript":{"id":"UnrealScript","title":"UnrealScript"},"Vala":{"id":"Vala","title":"Vala"},"VCL":{"id":"VCL","title":"VCL"},"Verilog":{"id":"Verilog","title":"Verilog"},"VHDL":{"id":"VHDL","title":"VHDL"},"VimL":{"id":"VimL","title":"VimL"},"Visual Basic":{"id":"Visual Basic","title":"Visual Basic"},"Volt":{"id":"Volt","title":"Volt"},"Web Ontology Language":{"id":"Web Ontology Language","title":"Web Ontology Language"},"WebIDL":{"id":"WebIDL","title":"WebIDL"},"wisp":{"id":"wisp","title":"wisp"},"xBase":{"id":"xBase","title":"xBase"},"XC":{"id":"XC","title":"XC"},"XML":{"id":"XML","title":"XML"},"Xojo":{"id":"Xojo","title":"Xojo"},"XProc":{"id":"XProc","title":"XProc"},"XQuery":{"id":"XQuery","title":"XQuery"},"XS":{"id":"XS","title":"XS"},"XSLT":{"id":"XSLT","title":"XSLT"},"Xtend":{"id":"Xtend","title":"Xtend"},"Yacc":{"id":"Yacc","title":"Yacc"},"YAML":{"id":"YAML","title":"YAML"},"Zend":{"id":"Zend","title":"Zend"},"Zephir":{"id":"Zephir","title":"Zephir"},"Zimpl":{"id":"Zimpl","title":"Zimpl"}}
            }
        }

    };

    return AllLangs;
});