define(['backbone', 'backbone-eventbroker'], function(Backbone) {
    'use strict';

    var AllLangs = {

        getAll: function () {
            return {
                "colors_and_initials": {
                    "ABAP": {
                        "color": "#E8274B"
                    },
                    "AGS Script": {
                        "color": "#B9D9FF"
                    },
                    "AMPL": {
                        "color": "#E6EFBB"
                    },
                    "ANTLR": {
                        "color": "#9DC3FF"
                    },
                    "API Blueprint": {
                        "color": "#2ACCA8"
                    },
                    "APL": {
                        "color": "#5A8164"
                    },
                    "ASP": {
                        "color": "#6a40fd"
                    },
                    "ATS": {
                        "color": "#1ac620"
                    },
                    "ActionScript": {
                        "color": "#882B0F"
                    },
                    "Ada": {
                        "color": "#02f88c"
                    },
                    "Agda": {
                        "color": "#315665"
                    },
                    "Alloy": {
                        "color": "#cc5c24"
                    },
                    "Ant Build System": {
                        "color": "#FFFFFF"
                    },
                    "ApacheConf": {
                        "color": "#FFFFFF"
                    },
                    "Apex": {
                        "color": "#FFFFFF"
                    },
                    "AppleScript": {
                        "color": "#FFFFFF"
                    },
                    "Arc": {
                        "color": "#aa2afe"
                    },
                    "Arduino": {
                        "color": "#bd79d1"
                    },
                    "AsciiDoc": {
                        "color": "#FFFFFF"
                    },
                    "AspectJ": {
                        "color": "#a957b0"
                    },
                    "Assembly": {
                        "color": "#6E4C13"
                    },
                    "Augeas": {
                        "color": "#FFFFFF"
                    },
                    "AutoHotkey": {
                        "color": "#6594b9"
                    },
                    "AutoIt": {
                        "color": "#1C3552"
                    },
                    "Awk": {
                        "color": "#FFFFFF"
                    },
                    "Batchfile": {
                        "color": "#FFFFFF"
                    },
                    "Befunge": {
                        "color": "#FFFFFF"
                    },
                    "Bison": {
                        "color": "#FFFFFF"
                    },
                    "BitBake": {
                        "color": "#FFFFFF"
                    },
                    "BlitzBasic": {
                        "color": "#FFFFFF"
                    },
                    "BlitzMax": {
                        "color": "#cd6400"
                    },
                    "Bluespec": {
                        "color": "#FFFFFF"
                    },
                    "Boo": {
                        "color": "#d4bec1"
                    },
                    "Brainfuck": {
                        "color": "#2F2530"
                    },
                    "Brightscript": {
                        "color": "#FFFFFF"
                    },
                    "Bro": {
                        "color": "#FFFFFF"
                    },
                    "C": {
                        "color": "#555555"
                    },
                    "C#": {
                        "color": "#178600"
                    },
                    ".NET": {
                        "color": "#178600"
                    },
                    "C++": {
                        "color": "#f34b7d"
                    },
                    "C-ObjDump": {
                        "color": "#FFFFFF"
                    },
                    "C2hs Haskell": {
                        "color": "#FFFFFF"
                    },
                    "CLIPS": {
                        "color": "#FFFFFF"
                    },
                    "CMake": {
                        "color": "#FFFFFF"
                    },
                    "COBOL": {
                        "color": "#FFFFFF"
                    },
                    "CSS": {
                        "color": "#563d7c"
                    },
                    "Blueprint": {
                        "color": "#563d7c"
                    },
                    "YAML": {
                        "color": "#FFFFFF"
                    },
                    "Sass": {
                        "color": "#FFFFFF"
                    },
                    "Cap'n Proto": {
                        "color": "#FFFFFF"
                    },
                    "CartoCSS": {
                        "color": "#FFFFFF"
                    },
                    "Ceylon": {
                        "color": "#FFFFFF"
                    },
                    "Chapel": {
                        "color": "#8dc63f"
                    },
                    "ChucK": {
                        "color": "#FFFFFF"
                    },
                    "Cirru": {
                        "color": "#ccccff"
                    },
                    "Clarion": {
                        "color": "#db901e"
                    },
                    "Clean": {
                        "color": "#3F85AF"
                    },
                    "Clojure": {
                        "color": "#db5855"
                    },
                    "CoffeeScript": {
                        "color": "#244776"
                    },
                    "ColdFusion": {
                        "color": "#ed2cd6"
                    },
                    "ColdFusion CFC": {
                        "color": "#ed2cd6"
                    },
                    "Common Lisp": {
                        "color": "#3fb68b"
                    },
                    "Component Pascal": {
                        "color": "#b0ce4e"
                    },
                    "Cool": {
                        "color": "#FFFFFF"
                    },
                    "Coq": {
                        "color": "#FFFFFF"
                    },
                    "Cpp-ObjDump": {
                        "color": "#FFFFFF"
                    },
                    "Creole": {
                        "color": "#FFFFFF"
                    },
                    "Crystal": {
                        "color": "#776791"
                    },
                    "Cucumber": {
                        "color": "#FFFFFF"
                    },
                    "Cuda": {
                        "color": "#FFFFFF"
                    },
                    "Cycript": {
                        "color": "#FFFFFF"
                    },
                    "Cython": {
                        "color": "#FFFFFF"
                    },
                    "D": {
                        "color": "#fcd46d"
                    },
                    "D-ObjDump": {
                        "color": "#FFFFFF"
                    },
                    "DIGITAL Command Language": {
                        "color": "#FFFFFF"
                    },
                    "DM": {
                        "color": "#447265"
                    },
                    "DTrace": {
                        "color": "#FFFFFF"
                    },
                    "Darcs Patch": {
                        "color": "#FFFFFF"
                    },
                    "Dart": {
                        "color": "#00B4AB"
                    },
                    "Diff": {
                        "color": "#88dddd"
                    },
                    "Dockerfile": {
                        "color": "#FFFFFF"
                    },
                    "Dogescript": {
                        "color": "#cca760"
                    },
                    "Dylan": {
                        "color": "#6c616e"
                    },
                    "E": {
                        "color": "#ccce35"
                    },
                    "ECL": {
                        "color": "#8a1267"
                    },
                    "Eagle": {
                        "color": "#814C05"
                    },
                    "Ecere Projects": {
                        "color": "#FFFFFF"
                    },
                    "Eiffel": {
                        "color": "#946d57"
                    },
                    "Elixir": {
                        "color": "#6e4a7e"
                    },
                    "Elm": {
                        "color": "#60B5CC"
                    },
                    "Emacs Lisp": {
                        "color": "#c065db"
                    },
                    "EmberScript": {
                        "color": "#FFF4F3"
                    },
                    "Erlang": {
                        "color": "#B83998"
                    },
                    "F#": {
                        "color": "#b845fc"
                    },
                    "FLUX": {
                        "color": "#88ccff"
                    },
                    "FORTRAN": {
                        "color": "#4d41b1"
                    },
                    "Factor": {
                        "color": "#636746"
                    },
                    "Fancy": {
                        "color": "#7b9db4"
                    },
                    "Fantom": {
                        "color": "#dbded5"
                    },
                    "Filterscript": {
                        "color": "#FFFFFF"
                    },
                    "Formatted": {
                        "color": "#FFFFFF"
                    },
                    "Forth": {
                        "color": "#341708"
                    },
                    "Frege": {
                        "color": "#00cafe"
                    },
                    "G-code": {
                        "color": "#FFFFFF"
                    },
                    "GAMS": {
                        "color": "#FFFFFF"
                    },
                    "GAP": {
                        "color": "#FFFFFF"
                    },
                    "GAS": {
                        "color": "#FFFFFF"
                    },
                    "GDScript": {
                        "color": "#FFFFFF"
                    },
                    "GLSL": {
                        "color": "#FFFFFF"
                    },
                    "Game Maker Language": {
                        "color": "#8fb200"
                    },
                    "Genshi": {
                        "color": "#FFFFFF"
                    },
                    "Gentoo Ebuild": {
                        "color": "#FFFFFF"
                    },
                    "Gentoo Eclass": {
                        "color": "#FFFFFF"
                    },
                    "Gettext Catalog": {
                        "color": "#FFFFFF"
                    },
                    "Glyph": {
                        "color": "#e4cc98"
                    },
                    "Gnuplot": {
                        "color": "#f0a9f0"
                    },
                    "Go": {
                        "color": "#375eab"
                    },
                    "Golo": {
                        "color": "#88562A"
                    },
                    "Gosu": {
                        "color": "#82937f"
                    },
                    "Grace": {
                        "color": "#FFFFFF"
                    },
                    "Gradle": {
                        "color": "#FFFFFF"
                    },
                    "Grammatical Framework": {
                        "color": "#79aa7a"
                    },
                    "Graph Modeling Language": {
                        "color": "#FFFFFF"
                    },
                    "Graphviz (DOT)": {
                        "color": "#FFFFFF"
                    },
                    "Groff": {
                        "color": "#FFFFFF"
                    },
                    "Groovy": {
                        "color": "#e69f56"
                    },
                    "Groovy Server Pages": {
                        "color": "#FFFFFF"
                    },
                    "HTML": {
                        "color": "#e44b23"
                    },
                    "HTML+Django": {
                        "color": "#FFFFFF"
                    },
                    "HTML+ERB": {
                        "color": "#FFFFFF"
                    },
                    "HTML+PHP": {
                        "color": "#FFFFFF"
                    },
                    "HTTP": {
                        "color": "#FFFFFF"
                    },
                    "Hack": {
                        "color": "#FFFFFF"
                    },
                    "Haml": {
                        "color": "#FFFFFF"
                    },
                    "Handlebars": {
                        "color": "#01a9d6"
                    },
                    "Harbour": {
                        "color": "#0e60e3"
                    },
                    "Haskell": {
                        "color": "#29b544"
                    },
                    "Haxe": {
                        "color": "#df7900"
                    },
                    "Hy": {
                        "color": "#7790B2"
                    },
                    "HyPhy": {
                        "color": "#FFFFFF"
                    },
                    "IDL": {
                        "color": "#a3522f"
                    },
                    "IGOR Pro": {
                        "color": "#FFFFFF"
                    },
                    "INI": {
                        "color": "#FFFFFF"
                    },
                    "IRC log": {
                        "color": "#FFFFFF"
                    },
                    "Idris": {
                        "color": "#FFFFFF"
                    },
                    "Inform 7": {
                        "color": "#FFFFFF"
                    },
                    "Inno Setup": {
                        "color": "#FFFFFF"
                    },
                    "Io": {
                        "color": "#a9188d"
                    },
                    "Ioke": {
                        "color": "#078193"
                    },
                    "Isabelle": {
                        "color": "#FEFE00"
                    },
                    "Isabelle ROOT": {
                        "color": "#FFFFFF"
                    },
                    "J": {
                        "color": "#9EEDFF"
                    },
                    "JFlex": {
                        "color": "#DBCA00"
                    },
                    "JSON": {
                        "color": "#FFFFFF"
                    },
                    "JSON5": {
                        "color": "#FFFFFF"
                    },
                    "JSONLD": {
                        "color": "#FFFFFF"
                    },
                    "JSONiq": {
                        "color": "#40d47e"
                    },
                    "Jade": {
                        "color": "#FFFFFF"
                    },
                    "Jasmin": {
                        "color": "#FFFFFF"
                    },
                    "Java Server Pages": {
                        "color": "#FFFFFF"
                    },
                    "JavaScript": {
                        "color": "#f1e05a"
                    },
                    "Express": {
                        "color": "#f1e05a"
                    },
                    "Backbone": {
                        "color": "#f1e05a"
                    },
                    "Angular": {
                        "color": "#f1e05a"
                    },
                    "Node": {
                        "color": "#f1e05a"
                    },
                    "React": {
                        "color": "#f1e05a"
                    },
                    "Ember": {
                        "color": "#f1e05a"
                    },
                    "Famo.us": {
                        "color": "#f1e05a"
                    },
                    "Protoype": {
                        "color": "#f1e05a"
                    },
                    "ExtJS": {
                        "color": "#f1e05a"
                    },
                    "Mootools": {
                        "color": "#f1e05a"
                    },
                    "Spry": {
                        "color": "#f1e05a"
                    },
                    "script.aculo.us": {
                        "color": "#f1e05a"
                    },
                    "ASP.NET": {
                        "color": "#f1e05a"
                    },
                    "Dojo": {
                        "color": "#f1e05a"
                    },
                    "MochiKit": {
                        "color": "#f1e05a"
                    },
                    "Julia": {
                        "color": "#a270ba"
                    },
                    "KRL": {
                        "color": "#28431f"
                    },
                    "KiCad": {
                        "color": "#FFFFFF"
                    },
                    "Kit": {
                        "color": "#FFFFFF"
                    },
                    "Kotlin": {
                        "color": "#F18E33"
                    },
                    "LFE": {
                        "color": "#004200"
                    },
                    "LLVM": {
                        "color": "#FFFFFF"
                    },
                    "LOLCODE": {
                        "color": "#cc9900"
                    },
                    "LSL": {
                        "color": "#3d9970"
                    },
                    "LabVIEW": {
                        "color": "#FFFFFF"
                    },
                    "Lasso": {
                        "color": "#999999"
                    },
                    "Latte": {
                        "color": "#A8FF97"
                    },
                    "Lean": {
                        "color": "#FFFFFF"
                    },
                    "Less": {
                        "color": "#FFFFFF"
                    },
                    "Lex": {
                        "color": "#DBCA00"
                    },
                    "LilyPond": {
                        "color": "#FFFFFF"
                    },
                    "Limbo": {
                        "color": "#FFFFFF"
                    },
                    "Linker Script": {
                        "color": "#FFFFFF"
                    },
                    "Linux Kernel Module": {
                        "color": "#FFFFFF"
                    },
                    "Liquid": {
                        "color": "#FFFFFF"
                    },
                    "Literate Agda": {
                        "color": "#FFFFFF"
                    },
                    "Literate CoffeeScript": {
                        "color": "#FFFFFF"
                    },
                    "Literate Haskell": {
                        "color": "#FFFFFF"
                    },
                    "LiveScript": {
                        "color": "#499886"
                    },
                    "Logos": {
                        "color": "#FFFFFF"
                    },
                    "Logtalk": {
                        "color": "#FFFFFF"
                    },
                    "LookML": {
                        "color": "#652B81"
                    },
                    "LoomScript": {
                        "color": "#FFFFFF"
                    },
                    "Lua": {
                        "color": "#000080"
                    },
                    "M": {
                        "color": "#FFFFFF"
                    },
                    "MTML": {
                        "color": "#b7e1f4"
                    },
                    "MUF": {
                        "color": "#FFFFFF"
                    },
                    "Makefile": {
                        "color": "#427819"
                    },
                    "Mako": {
                        "color": "#FFFFFF"
                    },
                    "Markdown": {
                        "color": "#FFFFFF"
                    },
                    "Mask": {
                        "color": "#f97732"
                    },
                    "Mathematica": {
                        "color": "#FFFFFF"
                    },
                    "Matlab": {
                        "color": "#bb92ac"
                    },
                    "Maven POM": {
                        "color": "#FFFFFF"
                    },
                    "Max": {
                        "color": "#c4a79c"
                    },
                    "MediaWiki": {
                        "color": "#FFFFFF"
                    },
                    "Mercury": {
                        "color": "#ff2b2b"
                    },
                    "MiniD": {
                        "color": "#FFFFFF"
                    },
                    "Mirah": {
                        "color": "#c7a938"
                    },
                    "Modelica": {
                        "color": "#FFFFFF"
                    },
                    "Modula-2": {
                        "color": "#FFFFFF"
                    },
                    "Module Management System": {
                        "color": "#FFFFFF"
                    },
                    "Monkey": {
                        "color": "#FFFFFF"
                    },
                    "Moocode": {
                        "color": "#FFFFFF"
                    },
                    "MoonScript": {
                        "color": "#FFFFFF"
                    },
                    "Myghty": {
                        "color": "#FFFFFF"
                    },
                    "NCL": {
                        "color": "#FFFFFF"
                    },
                    "NL": {
                        "color": "#FFFFFF"
                    },
                    "NSIS": {
                        "color": "#FFFFFF"
                    },
                    "Nemerle": {
                        "color": "#3d3c6e"
                    },
                    "NetLinx": {
                        "color": "#0aa0ff"
                    },
                    "NetLinx+ERB": {
                        "color": "#747faa"
                    },
                    "NetLogo": {
                        "color": "#ff6375"
                    },
                    "NewLisp": {
                        "color": "#87AED7"
                    },
                    "Nginx": {
                        "color": "#FFFFFF"
                    },
                    "Nimrod": {
                        "color": "#37775b"
                    },
                    "Ninja": {
                        "color": "#FFFFFF"
                    },
                    "Nit": {
                        "color": "#009917"
                    },
                    "Nix": {
                        "color": "#7e7eff"
                    },
                    "Nu": {
                        "color": "#c9df40"
                    },
                    "NumPy": {
                        "color": "#FFFFFF"
                    },
                    "OCaml": {
                        "color": "#3be133"
                    },
                    "ObjDump": {
                        "color": "#FFFFFF"
                    },
                    "Objective-C": {
                        "color": "#438eff"
                    },
                    "Objective-C++": {
                        "color": "#6866fb"
                    },
                    "Objective-J": {
                        "color": "#ff0c5a"
                    },
                    "Omgrofl": {
                        "color": "#cabbff"
                    },
                    "Opa": {
                        "color": "#FFFFFF"
                    },
                    "Opal": {
                        "color": "#f7ede0"
                    },
                    "OpenCL": {
                        "color": "#FFFFFF"
                    },
                    "OpenEdge ABL": {
                        "color": "#FFFFFF"
                    },
                    "OpenSCAD": {
                        "color": "#FFFFFF"
                    },
                    "Org": {
                        "color": "#FFFFFF"
                    },
                    "Ox": {
                        "color": "#FFFFFF"
                    },
                    "Oxygene": {
                        "color": "#cdd0e3"
                    },
                    "Oz": {
                        "color": "#fab738"
                    },
                    "PAWN": {
                        "color": "#dbb284"
                    },
                    "PHP": {
                        "color": "#4F5D95"
                    },
                    "Zend": {
                        "color": "#4F5D95"
                    },
                    "CakePHP": {
                        "color": "#4F5D95"
                    },
                    "Symfony": {
                        "color": "#4F5D95"
                    },
                    "CodeIgniter": {
                        "color": "#4F5D95"
                    },
                    "Akelos": {
                        "color": "#4F5D95"
                    },
                    "Agavi": {
                        "color": "#4F5D95"
                    },
                    "Prado": {
                        "color": "#4F5D95"
                    },
                    "Barebones": {
                        "color": "#4F5D95"
                    },
                    "Laravel": {
                        "color": "#4F5D95"
                    },
                    "PLSQL": {
                        "color": "#FFFFFF"
                    },
                    "PLpgSQL": {
                        "color": "#FFFFFF"
                    },
                    "Pan": {
                        "color": "#cc0000"
                    },
                    "Papyrus": {
                        "color": "#6600cc"
                    },
                    "Parrot": {
                        "color": "#f3ca0a"
                    },
                    "Parrot Assembly": {
                        "color": "#FFFFFF"
                    },
                    "Parrot Internal Representation": {
                        "color": "#FFFFFF"
                    },
                    "Pascal": {
                        "color": "#b0ce4e"
                    },
                    "Perl": {
                        "color": "#0298c3"
                    },
                    "Perl6": {
                        "color": "#0000fb"
                    },
                    "PicoLisp": {
                        "color": "#FFFFFF"
                    },
                    "PigLatin": {
                        "color": "#fcd7de"
                    },
                    "Pike": {
                        "color": "#005390"
                    },
                    "Pod": {
                        "color": "#FFFFFF"
                    },
                    "PogoScript": {
                        "color": "#d80074"
                    },
                    "PostScript": {
                        "color": "#FFFFFF"
                    },
                    "PowerShell": {
                        "color": "#FFFFFF"
                    },
                    "Processing": {
                        "color": "#0096D8"
                    },
                    "Prolog": {
                        "color": "#74283c"
                    },
                    "Propeller Spin": {
                        "color": "#7fa2a7"
                    },
                    "Protocol Buffer": {
                        "color": "#FFFFFF"
                    },
                    "Public Key": {
                        "color": "#FFFFFF"
                    },
                    "Puppet": {
                        "color": "#332A77"
                    },
                    "Pure Data": {
                        "color": "#91de79"
                    },
                    "PureBasic": {
                        "color": "#5a6986"
                    },
                    "PureScript": {
                        "color": "#1D222D"
                    },
                    "Python": {
                        "color": "#3572A5"
                    },
                    "Django": {
                        "color": "#3572A5"
                    },
                    "Flask": {
                        "color": "#3572A5"
                    },
                    "Pylons": {
                        "color": "#3572A5"
                    },
                    "TurboGears": {
                        "color": "#3572A5"
                    },
                    "Gluon": {
                        "color": "#3572A5"
                    },
                    "Python traceback": {
                        "color": "#FFFFFF"
                    },
                    "QML": {
                        "color": "#44a51c"
                    },
                    "QMake": {
                        "color": "#FFFFFF"
                    },
                    "R": {
                        "color": "#198ce7"
                    },
                    "RAML": {
                        "color": "#77d9fb"
                    },
                    "RDoc": {
                        "color": "#FFFFFF"
                    },
                    "REALbasic": {
                        "color": "#FFFFFF"
                    },
                    "RHTML": {
                        "color": "#FFFFFF"
                    },
                    "RMarkdown": {
                        "color": "#FFFFFF"
                    },
                    "Racket": {
                        "color": "#22228f"
                    },
                    "Ragel in Ruby Host": {
                        "color": "#9d5200"
                    },
                    "Raw token data": {
                        "color": "#FFFFFF"
                    },
                    "Rebol": {
                        "color": "#358a5b"
                    },
                    "Red": {
                        "color": "#ee0000"
                    },
                    "Redcode": {
                        "color": "#FFFFFF"
                    },
                    "RenderScript": {
                        "color": "#FFFFFF"
                    },
                    "RobotFramework": {
                        "color": "#FFFFFF"
                    },
                    "Rouge": {
                        "color": "#cc0088"
                    },
                    "Ruby": {
                        "color": "#701516"
                    },
                    "Rails": {
                        "color": "#701516"
                    },
                    "Nitro": {
                        "color": "#701516"
                    },
                    "Camping": {
                        "color": "#701516"
                    },
                    "Ramaze": {
                        "color": "#701516"
                    },
                    "Rust": {
                        "color": "#dea584"
                    },
                    "SAS": {
                        "color": "#B34936"
                    },
                    "SCSS": {
                        "color": "#FFFFFF"
                    },
                    "SMT": {
                        "color": "#FFFFFF"
                    },
                    "SPARQL": {
                        "color": "#FFFFFF"
                    },
                    "SQF": {
                        "color": "#3F3F3F"
                    },
                    "SQL": {
                        "color": "#FFFFFF"
                    },
                    "SQLPL": {
                        "color": "#FFFFFF"
                    },
                    "STON": {
                        "color": "#FFFFFF"
                    },
                    "SVG": {
                        "color": "#FFFFFF"
                    },
                    "Sage": {
                        "color": "#FFFFFF"
                    },
                    "SaltStack": {
                        "color": "#646464"
                    },
                    "Scala": {
                        "color": "#7dd3b0"
                    },
                    "Scaml": {
                        "color": "#FFFFFF"
                    },
                    "Scheme": {
                        "color": "#1e4aec"
                    },
                    "Scilab": {
                        "color": "#FFFFFF"
                    },
                    "Self": {
                        "color": "#0579aa"
                    },
                    "Shell": {
                        "color": "#89e051"
                    },
                    "Bash": {
                        "color": "#89e051"
                    },
                    "ShellSession": {
                        "color": "#FFFFFF"
                    },
                    "Shen": {
                        "color": "#120F14"
                    },
                    "Slash": {
                        "color": "#007eff"
                    },
                    "Slim": {
                        "color": "#ff8f77"
                    },
                    "Smali": {
                        "color": "#FFFFFF"
                    },
                    "Smalltalk": {
                        "color": "#596706"
                    },
                    "Smarty": {
                        "color": "#FFFFFF"
                    },
                    "SourcePawn": {
                        "color": "#5c7611"
                    },
                    "Squirrel": {
                        "color": "#800000"
                    },
                    "Standard ML": {
                        "color": "#dc566d"
                    },
                    "Stata": {
                        "color": "#FFFFFF"
                    },
                    "Stylus": {
                        "color": "#FFFFFF"
                    },
                    "SuperCollider": {
                        "color": "#46390b"
                    },
                    "Swift": {
                        "color": "#ffac45"
                    },
                    "SystemVerilog": {
                        "color": "#DAE1C2"
                    },
                    "TOML": {
                        "color": "#FFFFFF"
                    },
                    "TXL": {
                        "color": "#FFFFFF"
                    },
                    "Tcl": {
                        "color": "#e4cc98"
                    },
                    "Tcsh": {
                        "color": "#FFFFFF"
                    },
                    "TeX": {
                        "color": "#3D6117"
                    },
                    "Tea": {
                        "color": "#FFFFFF"
                    },
                    "Text": {
                        "color": "#FFFFFF"
                    },
                    "Textile": {
                        "color": "#FFFFFF"
                    },
                    "Thrift": {
                        "color": "#FFFFFF"
                    },
                    "Turing": {
                        "color": "#45f715"
                    },
                    "Turtle": {
                        "color": "#FFFFFF"
                    },
                    "Twig": {
                        "color": "#FFFFFF"
                    },
                    "TypeScript": {
                        "color": "#2b7489"
                    },
                    "Unified Parallel C": {
                        "color": "#4e3617"
                    },
                    "Unity3D Asset": {
                        "color": "#ab69a1"
                    },
                    "UnrealScript": {
                        "color": "#a54c4d"
                    },
                    "VCL": {
                        "color": "#FFFFFF"
                    },
                    "VHDL": {
                        "color": "#adb2cb"
                    },
                    "Vala": {
                        "color": "#fbe5cd"
                    },
                    "Verilog": {
                        "color": "#b2b7f8"
                    },
                    "VimL": {
                        "color": "#199f4b"
                    },
                    "Visual Basic": {
                        "color": "#945db7"
                    },
                    "Volt": {
                        "color": "#1F1F1F"
                    },
                    "Web Ontology Language": {
                        "color": "#9cc9dd"
                    },
                    "WebIDL": {
                        "color": "#FFFFFF"
                    },
                    "XC": {
                        "color": "#99DA07"
                    },
                    "XML": {
                        "color": "#FFFFFF"
                    },
                    "XProc": {
                        "color": "#FFFFFF"
                    },
                    "XQuery": {
                        "color": "#5232e7"
                    },
                    "XS": {
                        "color": "#FFFFFF"
                    },
                    "XSLT": {
                        "color": "#FFFFFF"
                    },
                    "Xojo": {
                        "color": "#FFFFFF"
                    },
                    "Xtend": {
                        "color": "#FFFFFF"
                    },
                    "Yacc": {
                        "color": "#FFFFFF"
                    },
                    "Zephir": {
                        "color": "#118f9e"
                    },
                    "Zimpl": {
                        "color": "#FFFFFF"
                    },
                    "desktop": {
                        "color": "#FFFFFF"
                    },
                    "eC": {
                        "color": "#913960"
                    },
                    "edn": {
                        "color": "#db5855"
                    },
                    "fish": {
                        "color": "#FFFFFF"
                    },
                    "mupad": {
                        "color": "#FFFFFF"
                    },
                    "nesC": {
                        "color": "#94B0C7"
                    },
                    "ooc": {
                        "color": "#b0b77e"
                    },
                    "reStructuredText": {
                        "color": "#FFFFFF"
                    },
                    "wisp": {
                        "color": "#7582D1"
                    },
                    "xBase": {
                        "color": "#403a40"
                    },
                    "Java": {
                        "color": "#b07219"
                    },
                    "Android": {
                        "color": "#b07219"
                    },
                    "Spring": {
                        "color": "#b07219"
                    },
                    "GWT": {
                        "color": "#b07219"
                    },
                    "Cocoon": {
                        "color": "#b07219"
                    },
                    "Aranea": {
                        "color": "#b07219"
                    },
                    "JSF": {
                        "color": "#b07219"
                    },
                    "AppFuse": {
                        "color": "#b07219"
                    },
                    "Struts": {
                        "color": "#b07219"
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