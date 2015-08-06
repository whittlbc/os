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
                        "initials": 'APL'
                    },
                    "ASP": {
                        "color": "#6a40fd",
                        "initials": 'ASP'
                    },
                    "ATS": {
                        "color": "#1ac620",
                        "initials": 'ATS'
                    },
                    "ActionScript": {
                        "color": "#882B0F",
                        "initials": 'AS'
                    },
                    "Ada": {
                        "color": "#02f88c",
                        "initials": 'Ada'
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
                        "color": "#FFFFFF",
                        "initials": 'ABS'
                    },
                    "ApacheConf": {
                        "color": "#FFFFFF",
                        "initials": 'AC'
                    },
                    "Apex": {
                        "color": "#FFFFFF",
                        "initials": 'A'
                    },
                    "AppleScript": {
                        "color": "#FFFFFF",
                        "initials": 'AS'
                    },
                    "Arc": {
                        "color": "#aa2afe",
                        "initials": 'Arc'
                    },
                    "Arduino": {
                        "color": "#bd79d1",
                        "initials": 'Ard'
                    },
                    "AsciiDoc": {
                        "color": "#FFFFFF",
                        "initials": 'A'
                    },
                    "AspectJ": {
                        "color": "#a957b0",
                        "initials": 'AJ'
                    },
                    "Assembly": {
                        "color": "#6E4C13",
                        "initials": 'A'
                    },
                    "Augeas": {
                        "color": "#FFFFFF",
                        "initials": 'A'
                    },
                    "AutoHotkey": {
                        "color": "#6594b9",
                        "initials": 'AHk'
                    },
                    "AutoIt": {
                        "color": "#1C3552",
                        "initials": 'AIT'
                    },
                    "Awk": {
                        "color": "#FFFFFF",
                        "initials": 'Awk'
                    },
                    "Batchfile": {
                        "color": "#FFFFFF",
                        "initials": 'B'
                    },
                    "Befunge": {
                        "color": "#FFFFFF",
                        "initials": 'B'
                    },
                    "Bison": {
                        "color": "#FFFFFF",
                        "initials": 'B'
                    },
                    "BitBake": {
                        "color": "#FFFFFF",
                        "initials": 'B'
                    },
                    "BlitzBasic": {
                        "color": "#FFFFFF",
                        "initials": 'B'
                    },
                    "BlitzMax": {
                        "color": "#cd6400",
                        "initials": 'BM'
                    },
                    "Bluespec": {
                        "color": "#FFFFFF",
                        "initials": 'B'
                    },
                    "Boo": {
                        "color": "#d4bec1",
                        "initials": 'Boo'
                    },
                    "Brainfuck": {
                        "color": "#2F2530",
                        "initials": 'Bf'
                    },
                    "Brightscript": {
                        "color": "#FFFFFF",
                        "initials": 'Bs'
                    },
                    "Bro": {
                        "color": "#FFFFFF",
                        "initials": 'Bro'
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
                        "initials": '.NET'
                    },
                    "C++": {
                        "color": "#f34b7d",
                        "initials": 'C++'
                    },
                    "C-ObjDump": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "C2hs Haskell": {
                        "color": "#FFFFFF",
                        "initials": 'C2H'
                    },
                    "CLIPS": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "CMake": {
                        "color": "#FFFFFF",
                        "initials": 'CMk'
                    },
                    "COBOL": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "CSS": {
                        "color": "#563d7c",
                        "initials": 'CSS'
                    },
                    "Blueprint": {
                        "color": "#563d7c",
                        "initials": 'B'
                    },
                    "YAML": {
                        "color": "#FFFFFF",
                        "initials": 'Y'
                    },
                    "Sass": {
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "Cap'n Proto": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "CartoCSS": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Ceylon": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Chapel": {
                        "color": "#8dc63f",
                        "initials": 'C'
                    },
                    "ChucK": {
                        "color": "#FFFFFF",
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
                        "initials": 'Cj'
                    },
                    "CoffeeScript": {
                        "color": "#244776",
                        "initials": 'CS'
                    },
                    "ColdFusion": {
                        "color": "#ed2cd6",
                        "initials": 'CF'
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
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Coq": {
                        "color": "#FFFFFF",
                        "initials": 'Coq'
                    },
                    "Cpp-ObjDump": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Creole": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Crystal": {
                        "color": "#776791",
                        "initials": 'C'
                    },
                    "Cucumber": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Cuda": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Cycript": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "Cython": {
                        "color": "#FFFFFF",
                        "initials": 'C'
                    },
                    "D": {
                        "color": "#fcd46d",
                        "initials": 'D'
                    },
                    "D-ObjDump": {
                        "color": "#FFFFFF",
                        "initials": 'D'
                    },
                    "DIGITAL Command Language": {
                        "color": "#FFFFFF",
                        "initials": 'DCL'
                    },
                    "DM": {
                        "color": "#447265",
                        "initials": 'DM'
                    },
                    "DTrace": {
                        "color": "#FFFFFF",
                        "initials": 'DT'
                    },
                    "Darcs Patch": {
                        "color": "#FFFFFF",
                        "initials": 'DP'
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
                        "color": "#FFFFFF",
                        "initials": 'D'
                    },
                    "Dogescript": {
                        "color": "#cca760",
                        "initials": 'Ds'
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
                        "initials": 'ECL'
                    },
                    "Eagle": {
                        "color": "#814C05",
                        "initials": 'E'
                    },
                    "Ecere Projects": {
                        "color": "#FFFFFF",
                        "initials": 'EP'
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
                        "initials": 'ES'
                    },
                    "Emacs Lisp": {
                        "color": "#c065db",
                        "initials": 'E'
                    },
                    "EmberScript": {
                        "color": "#FFF4F3",
                        "initials": 'E'
                    },
                    "Erlang": {
                        "color": "#B83998",
                        "initials": 'Elg'
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
                        "color": "#FFFFFF",
                        "initials": 'Fs'
                    },
                    "Formatted": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'Gc'
                    },
                    "GAMS": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "GAP": {
                        "color": "#FFFFFF",
                        "initials": 'GAP'
                    },
                    "GAS": {
                        "color": "#FFFFFF",
                        "initials": 'GAS'
                    },
                    "GDScript": {
                        "color": "#FFFFFF",
                        "initials": 'GDS'
                    },
                    "GLSL": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Game Maker Language": {
                        "color": "#8fb200",
                        "initials": 'GML'
                    },
                    "Genshi": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Gentoo Ebuild": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Gentoo Eclass": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Gettext Catalog": {
                        "color": "#FFFFFF",
                        "initials": 'GC'
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
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Gradle": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Grammatical Framework": {
                        "color": "#79aa7a",
                        "initials": 'GF'
                    },
                    "Graph Modeling Language": {
                        "color": "#FFFFFF",
                        "initials": 'GML'
                    },
                    "Graphviz (DOT)": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Groff": {
                        "color": "#FFFFFF",
                        "initials": 'G'
                    },
                    "Groovy": {
                        "color": "#e69f56",
                        "initials": 'G'
                    },
                    "Groovy Server Pages": {
                        "color": "#FFFFFF",
                        "initials": 'GSP'
                    },
                    "HTML": {
                        "color": "#e44b23",
                        "initials": 'H'
                    },
                    "HTML+Django": {
                        "color": "#FFFFFF",
                        "initials": 'H'
                    },
                    "HTML+ERB": {
                        "color": "#FFFFFF",
                        "initials": 'H'
                    },
                    "HTML+PHP": {
                        "color": "#FFFFFF",
                        "initials": 'H'
                    },
                    "HTTP": {
                        "color": "#FFFFFF",
                        "initials": 'H'
                    },
                    "Hack": {
                        "color": "#FFFFFF",
                        "initials": 'Hck'
                    },
                    "Haml": {
                        "color": "#FFFFFF",
                        "initials": 'H'
                    },
                    "Handlebars": {
                        "color": "#01a9d6",
                        "initials": 'Hbs'
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
                        "initials": 'Hx'
                    },
                    "Hy": {
                        "color": "#7790B2",
                        "initials": 'Hy'
                    },
                    "HyPhy": {
                        "color": "#FFFFFF",
                        "initials": 'HP'
                    },
                    "IDL": {
                        "color": "#a3522f",
                        "initials": 'IDL'
                    },
                    "IGOR Pro": {
                        "color": "#FFFFFF",
                        "initials": 'IP'
                    },
                    "INI": {
                        "color": "#FFFFFF",
                        "initials": 'INI'
                    },
                    "IRC log": {
                        "color": "#FFFFFF",
                        "initials": 'IRC'
                    },
                    "Idris": {
                        "color": "#FFFFFF",
                        "initials": 'I'
                    },
                    "Inform 7": {
                        "color": "#FFFFFF",
                        "initials": 'I7'
                    },
                    "Inno Setup": {
                        "color": "#FFFFFF",
                        "initials": 'IS'
                    },
                    "Io": {
                        "color": "#a9188d",
                        "initials": 'Io'
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
                        "color": "#FFFFFF",
                        "initials": 'IR'
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
                        "color": "#FFFFFF",
                        "initials": 'J'
                    },
                    "JSON5": {
                        "color": "#FFFFFF",
                        "initials": 'J'
                    },
                    "JSONLD": {
                        "color": "#FFFFFF",
                        "initials": 'J'
                    },
                    "JSONiq": {
                        "color": "#40d47e",
                        "initials": 'J'
                    },
                    "Jade": {
                        "color": "#FFFFFF",
                        "initials": 'J'
                    },
                    "Jasmin": {
                        "color": "#FFFFFF",
                        "initials": 'J'
                    },
                    "Java Server Pages": {
                        "color": "#FFFFFF",
                        "initials": 'JSP'
                    },
                    "JavaScript": {
                        "color": "#f1e05a",
                        "initials": 'JS'
                    },
                    "Express": {
                        "color": "#f1e05a",
                        "initials": 'Exp'
                    },
                    "Backbone": {
                        "color": "#f1e05a",
                        "initials": 'Bb'
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
                        "initials": 'A.N'
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
                        "initials": 'KRL'
                    },
                    "KiCad": {
                        "color": "#FFFFFF",
                        "initials": 'KC'
                    },
                    "Kit": {
                        "color": "#FFFFFF",
                        "initials": 'Kit'
                    },
                    "Kotlin": {
                        "color": "#F18E33",
                        "initials": 'K'
                    },
                    "LFE": {
                        "color": "#004200",
                        "initials": 'LFE'
                    },
                    "LLVM": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "LOLCODE": {
                        "color": "#cc9900",
                        "initials": 'L'
                    },
                    "LSL": {
                        "color": "#3d9970",
                        "initials": 'LSL'
                    },
                    "LabVIEW": {
                        "color": "#FFFFFF",
                        "initials": 'LV'
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
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Less": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Lex": {
                        "color": "#DBCA00",
                        "initials": 'Lex'
                    },
                    "LilyPond": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Limbo": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Linker Script": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Linux Kernel Module": {
                        "color": "#FFFFFF",
                        "initials": 'LKM'
                    },
                    "Liquid": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Literate Agda": {
                        "color": "#FFFFFF",
                        "initials": 'LA'
                    },
                    "Literate CoffeeScript": {
                        "color": "#FFFFFF",
                        "initials": 'LC'
                    },
                    "Literate Haskell": {
                        "color": "#FFFFFF",
                        "initials": 'LH'
                    },
                    "LiveScript": {
                        "color": "#499886",
                        "initials": 'L'
                    },
                    "Logos": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Logtalk": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "LookML": {
                        "color": "#652B81",
                        "initials": 'L'
                    },
                    "LoomScript": {
                        "color": "#FFFFFF",
                        "initials": 'L'
                    },
                    "Lua": {
                        "color": "#000080",
                        "initials": 'Lua'
                    },
                    "M": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "MTML": {
                        "color": "#b7e1f4",
                        "initials": 'M'
                    },
                    "MUF": {
                        "color": "#FFFFFF",
                        "initials": 'MUF'
                    },
                    "Makefile": {
                        "color": "#427819",
                        "initials": 'Mk'
                    },
                    "Mako": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "Markdown": {
                        "color": "#FFFFFF",
                        "initials": 'Md'
                    },
                    "Mask": {
                        "color": "#f97732",
                        "initials": 'M'
                    },
                    "Mathematica": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "Matlab": {
                        "color": "#bb92ac",
                        "initials": 'M'
                    },
                    "Maven POM": {
                        "color": "#FFFFFF",
                        "initials": 'MP'
                    },
                    "Max": {
                        "color": "#c4a79c",
                        "initials": 'Max'
                    },
                    "MediaWiki": {
                        "color": "#FFFFFF",
                        "initials": 'MW'
                    },
                    "Mercury": {
                        "color": "#ff2b2b",
                        "initials": 'M'
                    },
                    "MiniD": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "Mirah": {
                        "color": "#c7a938",
                        "initials": 'M'
                    },
                    "Modelica": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "Modula-2": {
                        "color": "#FFFFFF",
                        "initials": 'M2'
                    },
                    "Module Management System": {
                        "color": "#FFFFFF",
                        "initials": 'MMS'
                    },
                    "Monkey": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "Moocode": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "MoonScript": {
                        "color": "#FFFFFF",
                        "initials": 'MS'
                    },
                    "Myghty": {
                        "color": "#FFFFFF",
                        "initials": 'M'
                    },
                    "NCL": {
                        "color": "#FFFFFF",
                        "initials": 'NCL'
                    },
                    "NL": {
                        "color": "#FFFFFF",
                        "initials": 'NL'
                    },
                    "NSIS": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'N'
                    },
                    "Nimrod": {
                        "color": "#37775b",
                        "initials": 'N'
                    },
                    "Ninja": {
                        "color": "#FFFFFF",
                        "initials": 'N'
                    },
                    "Nit": {
                        "color": "#009917",
                        "initials": 'Nit'
                    },
                    "Nix": {
                        "color": "#7e7eff",
                        "initials": 'Nix'
                    },
                    "Nu": {
                        "color": "#c9df40",
                        "initials": 'Nu'
                    },
                    "NumPy": {
                        "color": "#FFFFFF",
                        "initials": 'NP'
                    },
                    "OCaml": {
                        "color": "#3be133",
                        "initials": 'O'
                    },
                    "ObjDump": {
                        "color": "#FFFFFF",
                        "initials": 'OD'
                    },
                    "Objective-C": {
                        "color": "#438eff",
                        "initials": 'OC'
                    },
                    "Objective-C++": {
                        "color": "#6866fb",
                        "initials": 'O'
                    },
                    "Objective-J": {
                        "color": "#ff0c5a",
                        "initials": 'OJ'
                    },
                    "Omgrofl": {
                        "color": "#cabbff",
                        "initials": 'O'
                    },
                    "Opa": {
                        "color": "#FFFFFF",
                        "initials": 'Opa'
                    },
                    "Opal": {
                        "color": "#f7ede0",
                        "initials": 'O'
                    },
                    "OpenCL": {
                        "color": "#FFFFFF",
                        "initials": 'O'
                    },
                    "OpenEdge ABL": {
                        "color": "#FFFFFF",
                        "initials": 'O'
                    },
                    "OpenSCAD": {
                        "color": "#FFFFFF",
                        "initials": 'O'
                    },
                    "Org": {
                        "color": "#FFFFFF",
                        "initials": 'Org'
                    },
                    "Ox": {
                        "color": "#FFFFFF",
                        "initials": 'Ox'
                    },
                    "Oxygene": {
                        "color": "#cdd0e3",
                        "initials": 'Oxy'
                    },
                    "Oz": {
                        "color": "#fab738",
                        "initials": 'Oz'
                    },
                    "PAWN": {
                        "color": "#dbb284",
                        "initials": 'P'
                    },
                    "PHP": {
                        "color": "#4F5D95",
                        "initials": 'PHP'
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
                        "initials": 'CI'
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
                        "color": "#FFFFFF",
                        "initials": 'P'
                    },
                    "PLpgSQL": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'PA'
                    },
                    "Parrot Internal Representation": {
                        "color": "#FFFFFF",
                        "initials": 'PIR'
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
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'P'
                    },
                    "PogoScript": {
                        "color": "#d80074",
                        "initials": 'P'
                    },
                    "PostScript": {
                        "color": "#FFFFFF",
                        "initials": 'P'
                    },
                    "PowerShell": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'PB'
                    },
                    "Public Key": {
                        "color": "#FFFFFF",
                        "initials": 'PK'
                    },
                    "Puppet": {
                        "color": "#332A77",
                        "initials": 'P'
                    },
                    "Pure Data": {
                        "color": "#91de79",
                        "initials": 'PD'
                    },
                    "PureBasic": {
                        "color": "#5a6986",
                        "initials": 'PB'
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
                        "initials": 'TG'
                    },
                    "Gluon": {
                        "color": "#3572A5",
                        "initials": 'G'
                    },
                    "Python traceback": {
                        "color": "#FFFFFF",
                        "initials": 'P'
                    },
                    "QML": {
                        "color": "#44a51c",
                        "initials": 'QML'
                    },
                    "QMake": {
                        "color": "#FFFFFF",
                        "initials": 'QM'
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
                        "color": "#FFFFFF",
                        "initials": 'R'
                    },
                    "REALbasic": {
                        "color": "#FFFFFF",
                        "initials": 'R'
                    },
                    "RHTML": {
                        "color": "#FFFFFF",
                        "initials": 'R'
                    },
                    "RMarkdown": {
                        "color": "#FFFFFF",
                        "initials": 'RM'
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
                        "color": "#FFFFFF",
                        "initials": 'Rtd'
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
                        "color": "#FFFFFF",
                        "initials": 'R'
                    },
                    "RenderScript": {
                        "color": "#FFFFFF",
                        "initials": 'RS'
                    },
                    "RobotFramework": {
                        "color": "#FFFFFF",
                        "initials": 'RF'
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
                        "initials": 'SAS'
                    },
                    "SCSS": {
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "SMT": {
                        "color": "#FFFFFF",
                        "initials": 'SMT'
                    },
                    "SPARQL": {
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "SQF": {
                        "color": "#3F3F3F",
                        "initials": 'SQF'
                    },
                    "SQL": {
                        "color": "#FFFFFF",
                        "initials": 'SQL'
                    },
                    "SQLPL": {
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "STON": {
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "SVG": {
                        "color": "#FFFFFF",
                        "initials": 'SVG'
                    },
                    "Sage": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "Scheme": {
                        "color": "#1e4aec",
                        "initials": 'S'
                    },
                    "Scilab": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "Smalltalk": {
                        "color": "#596706",
                        "initials": 'S'
                    },
                    "Smarty": {
                        "color": "#FFFFFF",
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
                        "initials": 'SM'
                    },
                    "Stata": {
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "Stylus": {
                        "color": "#FFFFFF",
                        "initials": 'S'
                    },
                    "SuperCollider": {
                        "color": "#46390b",
                        "initials": 'SC'
                    },
                    "Swift": {
                        "color": "#ffac45",
                        "initials": 'S'
                    },
                    "SystemVerilog": {
                        "color": "#DAE1C2",
                        "initials": 'SV'
                    },
                    "Tcl": {
                        "color": "#e4cc98",
                        "initials": 'T'
                    },
                    "Tcsh": {
                        "color": "#FFFFFF",
                        "initials": 'T'
                    },
                    "TeX": {
                        "color": "#3D6117",
                        "initials": 'T'
                    },
                    "Tea": {
                        "color": "#FFFFFF",
                        "initials": 'T'
                    },
                    "Text": {
                        "color": "#FFFFFF",
                        "initials": 'T'
                    },
                    "Textile": {
                        "color": "#FFFFFF",
                        "initials": 'T'
                    },
                    "Thrift": {
                        "color": "#FFFFFF",
                        "initials": 'T'
                    },
                    "Turing": {
                        "color": "#45f715",
                        "initials": 'T'
                    },
                    "Turtle": {
                        "color": "#FFFFFF",
                        "initials": 'T'
                    },
                    "Twig": {
                        "color": "#FFFFFF",
                        "initials": 'T'
                    },
                    "TypeScript": {
                        "color": "#2b7489",
                        "initials": 'TS'
                    },
                    "Unified Parallel C": {
                        "color": "#4e3617",
                        "initials": 'UPC'
                    },
                    "Unity3D Asset": {
                        "color": "#ab69a1",
                        "initials": 'U3D'
                    },
                    "UnrealScript": {
                        "color": "#a54c4d",
                        "initials": 'US'
                    },
                    "VCL": {
                        "color": "#FFFFFF",
                        "initials": 'VCL'
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
                        "initials": 'WOL'
                    },
                    "XC": {
                        "color": "#99DA07",
                        "initials": 'XC'
                    },
                    "XML": {
                        "color": "#FFFFFF",
                        "initials": 'XML'
                    },
                    "XProc": {
                        "color": "#FFFFFF",
                        "initials": 'XP'
                    },
                    "XQuery": {
                        "color": "#5232e7",
                        "initials": 'XQ'
                    },
                    "XS": {
                        "color": "#FFFFFF",
                        "initials": 'XS'
                    },
                    "XSLT": {
                        "color": "#FFFFFF",
                        "initials": 'X'
                    },
                    "Xojo": {
                        "color": "#FFFFFF",
                        "initials": 'X'
                    },
                    "Xtend": {
                        "color": "#FFFFFF",
                        "initials": 'Xt'
                    },
                    "Yacc": {
                        "color": "#FFFFFF",
                        "initials": 'Y'
                    },
                    "Zephir": {
                        "color": "#118f9e",
                        "initials": 'Z'
                    },
                    "Zimpl": {
                        "color": "#FFFFFF",
                        "initials": 'Z'
                    },
                    "desktop": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'F'
                    },
                    "mupad": {
                        "color": "#FFFFFF",
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
                        "color": "#FFFFFF",
                        "initials": 'rST'
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
                        "initials": 'JSP'
                    },
                    "AppFuse": {
                        "color": "#b07219",
                        "initials": 'AF'
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
                ]
            }
        }

    };

    return AllLangs;
});