define(['backbone', 'backbone-eventbroker'], function(Backbone) {
    'use strict';

    var AllLangs = {

        getAll: function () {
            return {
                "all": [
                    {
                        "id": 2577,
                        "name": "ABAP",
                        "color": "#E8274B",
                        "frameworks": []
                    },
                    {
                        "id": 2578,
                        "name": "AGS Script",
                        "color": "#B9D9FF",
                        "frameworks": []
                    },
                    {
                        "id": 2579,
                        "name": "AMPL",
                        "color": "#E6EFBB",
                        "frameworks": []
                    },
                    {
                        "id": 2580,
                        "name": "ANTLR",
                        "color": "#9DC3FF",
                        "frameworks": []
                    },
                    {
                        "id": 2581,
                        "name": "API Blueprint",
                        "color": "#2ACCA8",
                        "frameworks": []
                    },
                    {
                        "id": 2582,
                        "name": "APL",
                        "color": "#5A8164",
                        "frameworks": []
                    },
                    {
                        "id": 2583,
                        "name": "ASP",
                        "color": "#6a40fd",
                        "frameworks": []
                    },
                    {
                        "id": 2584,
                        "name": "ATS",
                        "color": "#1ac620",
                        "frameworks": []
                    },
                    {
                        "id": 2585,
                        "name": "ActionScript",
                        "color": "#882B0F",
                        "frameworks": []
                    },
                    {
                        "id": 2586,
                        "name": "Ada",
                        "color": "#02f88c",
                        "frameworks": []
                    },
                    {
                        "id": 2587,
                        "name": "Agda",
                        "color": "#315665",
                        "frameworks": []
                    },
                    {
                        "id": 2588,
                        "name": "Alloy",
                        "color": "#cc5c24",
                        "frameworks": []
                    },
                    {
                        "id": 2589,
                        "name": "Ant Build System",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2590,
                        "name": "ApacheConf",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2591,
                        "name": "Apex",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2592,
                        "name": "AppleScript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2593,
                        "name": "Arc",
                        "color": "#aa2afe",
                        "frameworks": []
                    },
                    {
                        "id": 2594,
                        "name": "Arduino",
                        "color": "#bd79d1",
                        "frameworks": []
                    },
                    {
                        "id": 2595,
                        "name": "AsciiDoc",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2596,
                        "name": "AspectJ",
                        "color": "#a957b0",
                        "frameworks": []
                    },
                    {
                        "id": 2597,
                        "name": "Assembly",
                        "color": "#6E4C13",
                        "frameworks": []
                    },
                    {
                        "id": 2598,
                        "name": "Augeas",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2599,
                        "name": "AutoHotkey",
                        "color": "#6594b9",
                        "frameworks": []
                    },
                    {
                        "id": 2600,
                        "name": "AutoIt",
                        "color": "#1C3552",
                        "frameworks": []
                    },
                    {
                        "id": 2601,
                        "name": "Awk",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2602,
                        "name": "Batchfile",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2603,
                        "name": "Befunge",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2604,
                        "name": "Bison",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2605,
                        "name": "BitBake",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2606,
                        "name": "BlitzBasic",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2607,
                        "name": "BlitzMax",
                        "color": "#cd6400",
                        "frameworks": []
                    },
                    {
                        "id": 2608,
                        "name": "Bluespec",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2609,
                        "name": "Boo",
                        "color": "#d4bec1",
                        "frameworks": []
                    },
                    {
                        "id": 2610,
                        "name": "Brainfuck",
                        "color": "#2F2530",
                        "frameworks": []
                    },
                    {
                        "id": 2611,
                        "name": "Brightscript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2612,
                        "name": "Bro",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2613,
                        "name": "C",
                        "color": "#555555",
                        "frameworks": []
                    },
                    {
                        "id": 2614,
                        "name": "C#",
                        "color": "#178600",
                        "frameworks": [
                            ".NET"
                        ]
                    },
                    {
                        "id": 2615,
                        "name": "C++",
                        "color": "#f34b7d",
                        "frameworks": []
                    },
                    {
                        "id": 2616,
                        "name": "C-ObjDump",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2617,
                        "name": "C2hs Haskell",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2618,
                        "name": "CLIPS",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2619,
                        "name": "CMake",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2620,
                        "name": "COBOL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2621,
                        "name": "CSS",
                        "color": "#563d7c",
                        "frameworks": [
                            "Blueprint",
                            "YAML",
                            "Sass"
                        ]
                    },
                    {
                        "id": 2622,
                        "name": "Cap'n Proto",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2623,
                        "name": "CartoCSS",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2624,
                        "name": "Ceylon",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2625,
                        "name": "Chapel",
                        "color": "#8dc63f",
                        "frameworks": []
                    },
                    {
                        "id": 2626,
                        "name": "ChucK",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2627,
                        "name": "Cirru",
                        "color": "#ccccff",
                        "frameworks": []
                    },
                    {
                        "id": 2628,
                        "name": "Clarion",
                        "color": "#db901e",
                        "frameworks": []
                    },
                    {
                        "id": 2629,
                        "name": "Clean",
                        "color": "#3F85AF",
                        "frameworks": []
                    },
                    {
                        "id": 2630,
                        "name": "Clojure",
                        "color": "#db5855",
                        "frameworks": []
                    },
                    {
                        "id": 2631,
                        "name": "CoffeeScript",
                        "color": "#244776",
                        "frameworks": []
                    },
                    {
                        "id": 2632,
                        "name": "ColdFusion",
                        "color": "#ed2cd6",
                        "frameworks": []
                    },
                    {
                        "id": 2633,
                        "name": "ColdFusion CFC",
                        "color": "#ed2cd6",
                        "frameworks": []
                    },
                    {
                        "id": 2634,
                        "name": "Common Lisp",
                        "color": "#3fb68b",
                        "frameworks": []
                    },
                    {
                        "id": 2635,
                        "name": "Component Pascal",
                        "color": "#b0ce4e",
                        "frameworks": []
                    },
                    {
                        "id": 2636,
                        "name": "Cool",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2637,
                        "name": "Coq",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2638,
                        "name": "Cpp-ObjDump",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2639,
                        "name": "Creole",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2640,
                        "name": "Crystal",
                        "color": "#776791",
                        "frameworks": []
                    },
                    {
                        "id": 2641,
                        "name": "Cucumber",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2642,
                        "name": "Cuda",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2643,
                        "name": "Cycript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2644,
                        "name": "Cython",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2645,
                        "name": "D",
                        "color": "#fcd46d",
                        "frameworks": []
                    },
                    {
                        "id": 2646,
                        "name": "D-ObjDump",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2647,
                        "name": "DIGITAL Command Language",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2648,
                        "name": "DM",
                        "color": "#447265",
                        "frameworks": []
                    },
                    {
                        "id": 2649,
                        "name": "DTrace",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2650,
                        "name": "Darcs Patch",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2651,
                        "name": "Dart",
                        "color": "#00B4AB",
                        "frameworks": []
                    },
                    {
                        "id": 2652,
                        "name": "Diff",
                        "color": "#88dddd",
                        "frameworks": []
                    },
                    {
                        "id": 2653,
                        "name": "Dockerfile",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2654,
                        "name": "Dogescript",
                        "color": "#cca760",
                        "frameworks": []
                    },
                    {
                        "id": 2655,
                        "name": "Dylan",
                        "color": "#6c616e",
                        "frameworks": []
                    },
                    {
                        "id": 2656,
                        "name": "E",
                        "color": "#ccce35",
                        "frameworks": []
                    },
                    {
                        "id": 2657,
                        "name": "ECL",
                        "color": "#8a1267",
                        "frameworks": []
                    },
                    {
                        "id": 2658,
                        "name": "Eagle",
                        "color": "#814C05",
                        "frameworks": []
                    },
                    {
                        "id": 2659,
                        "name": "Ecere Projects",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2660,
                        "name": "Eiffel",
                        "color": "#946d57",
                        "frameworks": []
                    },
                    {
                        "id": 2661,
                        "name": "Elixir",
                        "color": "#6e4a7e",
                        "frameworks": []
                    },
                    {
                        "id": 2662,
                        "name": "Elm",
                        "color": "#60B5CC",
                        "frameworks": []
                    },
                    {
                        "id": 2663,
                        "name": "Emacs Lisp",
                        "color": "#c065db",
                        "frameworks": []
                    },
                    {
                        "id": 2664,
                        "name": "EmberScript",
                        "color": "#FFF4F3",
                        "frameworks": []
                    },
                    {
                        "id": 2665,
                        "name": "Erlang",
                        "color": "#B83998",
                        "frameworks": []
                    },
                    {
                        "id": 2666,
                        "name": "F#",
                        "color": "#b845fc",
                        "frameworks": []
                    },
                    {
                        "id": 2667,
                        "name": "FLUX",
                        "color": "#88ccff",
                        "frameworks": []
                    },
                    {
                        "id": 2668,
                        "name": "FORTRAN",
                        "color": "#4d41b1",
                        "frameworks": []
                    },
                    {
                        "id": 2669,
                        "name": "Factor",
                        "color": "#636746",
                        "frameworks": []
                    },
                    {
                        "id": 2670,
                        "name": "Fancy",
                        "color": "#7b9db4",
                        "frameworks": []
                    },
                    {
                        "id": 2671,
                        "name": "Fantom",
                        "color": "#dbded5",
                        "frameworks": []
                    },
                    {
                        "id": 2672,
                        "name": "Filterscript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2673,
                        "name": "Formatted",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2674,
                        "name": "Forth",
                        "color": "#341708",
                        "frameworks": []
                    },
                    {
                        "id": 2675,
                        "name": "Frege",
                        "color": "#00cafe",
                        "frameworks": []
                    },
                    {
                        "id": 2676,
                        "name": "G-code",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2677,
                        "name": "GAMS",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2678,
                        "name": "GAP",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2679,
                        "name": "GAS",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2680,
                        "name": "GDScript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2681,
                        "name": "GLSL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2682,
                        "name": "Game Maker Language",
                        "color": "#8fb200",
                        "frameworks": []
                    },
                    {
                        "id": 2683,
                        "name": "Genshi",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2684,
                        "name": "Gentoo Ebuild",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2685,
                        "name": "Gentoo Eclass",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2686,
                        "name": "Gettext Catalog",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2687,
                        "name": "Glyph",
                        "color": "#e4cc98",
                        "frameworks": []
                    },
                    {
                        "id": 2688,
                        "name": "Gnuplot",
                        "color": "#f0a9f0",
                        "frameworks": []
                    },
                    {
                        "id": 2689,
                        "name": "Go",
                        "color": "#375eab",
                        "frameworks": []
                    },
                    {
                        "id": 2690,
                        "name": "Golo",
                        "color": "#88562A",
                        "frameworks": []
                    },
                    {
                        "id": 2691,
                        "name": "Gosu",
                        "color": "#82937f",
                        "frameworks": []
                    },
                    {
                        "id": 2692,
                        "name": "Grace",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2693,
                        "name": "Gradle",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2694,
                        "name": "Grammatical Framework",
                        "color": "#79aa7a",
                        "frameworks": []
                    },
                    {
                        "id": 2695,
                        "name": "Graph Modeling Language",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2696,
                        "name": "Graphviz (DOT)",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2697,
                        "name": "Groff",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2698,
                        "name": "Groovy",
                        "color": "#e69f56",
                        "frameworks": []
                    },
                    {
                        "id": 2699,
                        "name": "Groovy Server Pages",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2700,
                        "name": "HTML",
                        "color": "#e44b23",
                        "frameworks": []
                    },
                    {
                        "id": 2701,
                        "name": "HTML+Django",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2702,
                        "name": "HTML+ERB",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2703,
                        "name": "HTML+PHP",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2704,
                        "name": "HTTP",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2705,
                        "name": "Hack",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2706,
                        "name": "Haml",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2707,
                        "name": "Handlebars",
                        "color": "#01a9d6",
                        "frameworks": []
                    },
                    {
                        "id": 2708,
                        "name": "Harbour",
                        "color": "#0e60e3",
                        "frameworks": []
                    },
                    {
                        "id": 2709,
                        "name": "Haskell",
                        "color": "#29b544",
                        "frameworks": []
                    },
                    {
                        "id": 2710,
                        "name": "Haxe",
                        "color": "#df7900",
                        "frameworks": []
                    },
                    {
                        "id": 2711,
                        "name": "Hy",
                        "color": "#7790B2",
                        "frameworks": []
                    },
                    {
                        "id": 2712,
                        "name": "HyPhy",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2713,
                        "name": "IDL",
                        "color": "#a3522f",
                        "frameworks": []
                    },
                    {
                        "id": 2714,
                        "name": "IGOR Pro",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2715,
                        "name": "INI",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2716,
                        "name": "IRC log",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2717,
                        "name": "Idris",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2718,
                        "name": "Inform 7",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2719,
                        "name": "Inno Setup",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2720,
                        "name": "Io",
                        "color": "#a9188d",
                        "frameworks": []
                    },
                    {
                        "id": 2721,
                        "name": "Ioke",
                        "color": "#078193",
                        "frameworks": []
                    },
                    {
                        "id": 2722,
                        "name": "Isabelle",
                        "color": "#FEFE00",
                        "frameworks": []
                    },
                    {
                        "id": 2723,
                        "name": "Isabelle ROOT",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2724,
                        "name": "J",
                        "color": "#9EEDFF",
                        "frameworks": []
                    },
                    {
                        "id": 2725,
                        "name": "JFlex",
                        "color": "#DBCA00",
                        "frameworks": []
                    },
                    {
                        "id": 2726,
                        "name": "JSON",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2727,
                        "name": "JSON5",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2728,
                        "name": "JSONLD",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2729,
                        "name": "JSONiq",
                        "color": "#40d47e",
                        "frameworks": []
                    },
                    {
                        "id": 2730,
                        "name": "Jade",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2731,
                        "name": "Jasmin",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2733,
                        "name": "Java Server Pages",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2734,
                        "name": "JavaScript",
                        "color": "#f1e05a",
                        "frameworks": [
                            "Express",
                            "Backbone",
                            "Angular",
                            "Node",
                            "React",
                            "Angular",
                            "Ember",
                            "Famo.us",
                            "Protoype",
                            "ExtJS",
                            "Mootools",
                            "Spry",
                            "script.aculo.us",
                            "ASP.NET",
                            "Dojo",
                            "MochiKit"
                        ]
                    },
                    {
                        "id": 2735,
                        "name": "Julia",
                        "color": "#a270ba",
                        "frameworks": []
                    },
                    {
                        "id": 2736,
                        "name": "KRL",
                        "color": "#28431f",
                        "frameworks": []
                    },
                    {
                        "id": 2737,
                        "name": "KiCad",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2738,
                        "name": "Kit",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2739,
                        "name": "Kotlin",
                        "color": "#F18E33",
                        "frameworks": []
                    },
                    {
                        "id": 2740,
                        "name": "LFE",
                        "color": "#004200",
                        "frameworks": []
                    },
                    {
                        "id": 2741,
                        "name": "LLVM",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2742,
                        "name": "LOLCODE",
                        "color": "#cc9900",
                        "frameworks": []
                    },
                    {
                        "id": 2743,
                        "name": "LSL",
                        "color": "#3d9970",
                        "frameworks": []
                    },
                    {
                        "id": 2744,
                        "name": "LabVIEW",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2745,
                        "name": "Lasso",
                        "color": "#999999",
                        "frameworks": []
                    },
                    {
                        "id": 2746,
                        "name": "Latte",
                        "color": "#A8FF97",
                        "frameworks": []
                    },
                    {
                        "id": 2747,
                        "name": "Lean",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2748,
                        "name": "Less",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2749,
                        "name": "Lex",
                        "color": "#DBCA00",
                        "frameworks": []
                    },
                    {
                        "id": 2750,
                        "name": "LilyPond",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2751,
                        "name": "Limbo",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2752,
                        "name": "Linker Script",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2753,
                        "name": "Linux Kernel Module",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2754,
                        "name": "Liquid",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2755,
                        "name": "Literate Agda",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2756,
                        "name": "Literate CoffeeScript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2757,
                        "name": "Literate Haskell",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2758,
                        "name": "LiveScript",
                        "color": "#499886",
                        "frameworks": []
                    },
                    {
                        "id": 2759,
                        "name": "Logos",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2760,
                        "name": "Logtalk",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2761,
                        "name": "LookML",
                        "color": "#652B81",
                        "frameworks": []
                    },
                    {
                        "id": 2762,
                        "name": "LoomScript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2763,
                        "name": "Lua",
                        "color": "#000080",
                        "frameworks": []
                    },
                    {
                        "id": 2764,
                        "name": "M",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2765,
                        "name": "MTML",
                        "color": "#b7e1f4",
                        "frameworks": []
                    },
                    {
                        "id": 2766,
                        "name": "MUF",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2767,
                        "name": "Makefile",
                        "color": "#427819",
                        "frameworks": []
                    },
                    {
                        "id": 2768,
                        "name": "Mako",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2769,
                        "name": "Markdown",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2770,
                        "name": "Mask",
                        "color": "#f97732",
                        "frameworks": []
                    },
                    {
                        "id": 2771,
                        "name": "Mathematica",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2772,
                        "name": "Matlab",
                        "color": "#bb92ac",
                        "frameworks": []
                    },
                    {
                        "id": 2773,
                        "name": "Maven POM",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2774,
                        "name": "Max",
                        "color": "#c4a79c",
                        "frameworks": []
                    },
                    {
                        "id": 2775,
                        "name": "MediaWiki",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2776,
                        "name": "Mercury",
                        "color": "#ff2b2b",
                        "frameworks": []
                    },
                    {
                        "id": 2777,
                        "name": "MiniD",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2778,
                        "name": "Mirah",
                        "color": "#c7a938",
                        "frameworks": []
                    },
                    {
                        "id": 2779,
                        "name": "Modelica",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2780,
                        "name": "Modula-2",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2781,
                        "name": "Module Management System",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2782,
                        "name": "Monkey",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2783,
                        "name": "Moocode",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2784,
                        "name": "MoonScript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2785,
                        "name": "Myghty",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2786,
                        "name": "NCL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2787,
                        "name": "NL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2788,
                        "name": "NSIS",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2789,
                        "name": "Nemerle",
                        "color": "#3d3c6e",
                        "frameworks": []
                    },
                    {
                        "id": 2790,
                        "name": "NetLinx",
                        "color": "#0aa0ff",
                        "frameworks": []
                    },
                    {
                        "id": 2791,
                        "name": "NetLinx+ERB",
                        "color": "#747faa",
                        "frameworks": []
                    },
                    {
                        "id": 2792,
                        "name": "NetLogo",
                        "color": "#ff6375",
                        "frameworks": []
                    },
                    {
                        "id": 2793,
                        "name": "NewLisp",
                        "color": "#87AED7",
                        "frameworks": []
                    },
                    {
                        "id": 2794,
                        "name": "Nginx",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2795,
                        "name": "Nimrod",
                        "color": "#37775b",
                        "frameworks": []
                    },
                    {
                        "id": 2796,
                        "name": "Ninja",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2797,
                        "name": "Nit",
                        "color": "#009917",
                        "frameworks": []
                    },
                    {
                        "id": 2798,
                        "name": "Nix",
                        "color": "#7e7eff",
                        "frameworks": []
                    },
                    {
                        "id": 2799,
                        "name": "Nu",
                        "color": "#c9df40",
                        "frameworks": []
                    },
                    {
                        "id": 2800,
                        "name": "NumPy",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2801,
                        "name": "OCaml",
                        "color": "#3be133",
                        "frameworks": []
                    },
                    {
                        "id": 2802,
                        "name": "ObjDump",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2803,
                        "name": "Objective-C",
                        "color": "#438eff",
                        "frameworks": []
                    },
                    {
                        "id": 2804,
                        "name": "Objective-C++",
                        "color": "#6866fb",
                        "frameworks": []
                    },
                    {
                        "id": 2805,
                        "name": "Objective-J",
                        "color": "#ff0c5a",
                        "frameworks": []
                    },
                    {
                        "id": 2806,
                        "name": "Omgrofl",
                        "color": "#cabbff",
                        "frameworks": []
                    },
                    {
                        "id": 2807,
                        "name": "Opa",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2808,
                        "name": "Opal",
                        "color": "#f7ede0",
                        "frameworks": []
                    },
                    {
                        "id": 2809,
                        "name": "OpenCL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2810,
                        "name": "OpenEdge ABL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2811,
                        "name": "OpenSCAD",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2812,
                        "name": "Org",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2813,
                        "name": "Ox",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2814,
                        "name": "Oxygene",
                        "color": "#cdd0e3",
                        "frameworks": []
                    },
                    {
                        "id": 2815,
                        "name": "Oz",
                        "color": "#fab738",
                        "frameworks": []
                    },
                    {
                        "id": 2816,
                        "name": "PAWN",
                        "color": "#dbb284",
                        "frameworks": []
                    },
                    {
                        "id": 2817,
                        "name": "PHP",
                        "color": "#4F5D95",
                        "frameworks": [
                            "Zend",
                            "CakePHP",
                            "Symfony",
                            "CodeIgniter",
                            "Akelos",
                            "Agavi",
                            "Prado",
                            "Barebones",
                            "Laravel"
                        ]
                    },
                    {
                        "id": 2818,
                        "name": "PLSQL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2819,
                        "name": "PLpgSQL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2820,
                        "name": "Pan",
                        "color": "#cc0000",
                        "frameworks": []
                    },
                    {
                        "id": 2821,
                        "name": "Papyrus",
                        "color": "#6600cc",
                        "frameworks": []
                    },
                    {
                        "id": 2822,
                        "name": "Parrot",
                        "color": "#f3ca0a",
                        "frameworks": []
                    },
                    {
                        "id": 2823,
                        "name": "Parrot Assembly",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2824,
                        "name": "Parrot Internal Representation",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2825,
                        "name": "Pascal",
                        "color": "#b0ce4e",
                        "frameworks": []
                    },
                    {
                        "id": 2826,
                        "name": "Perl",
                        "color": "#0298c3",
                        "frameworks": []
                    },
                    {
                        "id": 2827,
                        "name": "Perl6",
                        "color": "#0000fb",
                        "frameworks": []
                    },
                    {
                        "id": 2828,
                        "name": "PicoLisp",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2829,
                        "name": "PigLatin",
                        "color": "#fcd7de",
                        "frameworks": []
                    },
                    {
                        "id": 2830,
                        "name": "Pike",
                        "color": "#005390",
                        "frameworks": []
                    },
                    {
                        "id": 2831,
                        "name": "Pod",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2832,
                        "name": "PogoScript",
                        "color": "#d80074",
                        "frameworks": []
                    },
                    {
                        "id": 2833,
                        "name": "PostScript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2834,
                        "name": "PowerShell",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2835,
                        "name": "Processing",
                        "color": "#0096D8",
                        "frameworks": []
                    },
                    {
                        "id": 2836,
                        "name": "Prolog",
                        "color": "#74283c",
                        "frameworks": []
                    },
                    {
                        "id": 2837,
                        "name": "Propeller Spin",
                        "color": "#7fa2a7",
                        "frameworks": []
                    },
                    {
                        "id": 2838,
                        "name": "Protocol Buffer",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2839,
                        "name": "Public Key",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2840,
                        "name": "Puppet",
                        "color": "#332A77",
                        "frameworks": []
                    },
                    {
                        "id": 2841,
                        "name": "Pure Data",
                        "color": "#91de79",
                        "frameworks": []
                    },
                    {
                        "id": 2842,
                        "name": "PureBasic",
                        "color": "#5a6986",
                        "frameworks": []
                    },
                    {
                        "id": 2843,
                        "name": "PureScript",
                        "color": "#1D222D",
                        "frameworks": []
                    },
                    {
                        "id": 2844,
                        "name": "Python",
                        "color": "#3572A5",
                        "frameworks": [
                            "Django",
                            "Flask",
                            "Pylons",
                            "TurboGears",
                            "Gluon"
                        ]
                    },
                    {
                        "id": 2845,
                        "name": "Python traceback",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2846,
                        "name": "QML",
                        "color": "#44a51c",
                        "frameworks": []
                    },
                    {
                        "id": 2847,
                        "name": "QMake",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2848,
                        "name": "R",
                        "color": "#198ce7",
                        "frameworks": []
                    },
                    {
                        "id": 2849,
                        "name": "RAML",
                        "color": "#77d9fb",
                        "frameworks": []
                    },
                    {
                        "id": 2850,
                        "name": "RDoc",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2851,
                        "name": "REALbasic",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2852,
                        "name": "RHTML",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2853,
                        "name": "RMarkdown",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2854,
                        "name": "Racket",
                        "color": "#22228f",
                        "frameworks": []
                    },
                    {
                        "id": 2855,
                        "name": "Ragel in Ruby Host",
                        "color": "#9d5200",
                        "frameworks": []
                    },
                    {
                        "id": 2856,
                        "name": "Raw token data",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2857,
                        "name": "Rebol",
                        "color": "#358a5b",
                        "frameworks": []
                    },
                    {
                        "id": 2858,
                        "name": "Red",
                        "color": "#ee0000",
                        "frameworks": []
                    },
                    {
                        "id": 2859,
                        "name": "Redcode",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2860,
                        "name": "RenderScript",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2861,
                        "name": "RobotFramework",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2862,
                        "name": "Rouge",
                        "color": "#cc0088",
                        "frameworks": []
                    },
                    {
                        "id": 2863,
                        "name": "Ruby",
                        "color": "#701516",
                        "frameworks": [
                            "Rails",
                            "Nitro",
                            "Camping",
                            "Ramaze"
                        ]
                    },
                    {
                        "id": 2864,
                        "name": "Rust",
                        "color": "#dea584",
                        "frameworks": []
                    },
                    {
                        "id": 2865,
                        "name": "SAS",
                        "color": "#B34936",
                        "frameworks": []
                    },
                    {
                        "id": 2866,
                        "name": "SCSS",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2867,
                        "name": "SMT",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2868,
                        "name": "SPARQL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2869,
                        "name": "SQF",
                        "color": "#3F3F3F",
                        "frameworks": []
                    },
                    {
                        "id": 2870,
                        "name": "SQL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2871,
                        "name": "SQLPL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2872,
                        "name": "STON",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2873,
                        "name": "SVG",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2874,
                        "name": "Sage",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2875,
                        "name": "SaltStack",
                        "color": "#646464",
                        "frameworks": []
                    },
                    {
                        "id": 2876,
                        "name": "Sass",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2877,
                        "name": "Scala",
                        "color": "#7dd3b0",
                        "frameworks": []
                    },
                    {
                        "id": 2878,
                        "name": "Scaml",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2879,
                        "name": "Scheme",
                        "color": "#1e4aec",
                        "frameworks": []
                    },
                    {
                        "id": 2880,
                        "name": "Scilab",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2881,
                        "name": "Self",
                        "color": "#0579aa",
                        "frameworks": []
                    },
                    {
                        "id": 2882,
                        "name": "Shell",
                        "color": "#89e051",
                        "frameworks": [
                            "Bash"
                        ]
                    },
                    {
                        "id": 2883,
                        "name": "ShellSession",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2884,
                        "name": "Shen",
                        "color": "#120F14",
                        "frameworks": []
                    },
                    {
                        "id": 2885,
                        "name": "Slash",
                        "color": "#007eff",
                        "frameworks": []
                    },
                    {
                        "id": 2886,
                        "name": "Slim",
                        "color": "#ff8f77",
                        "frameworks": []
                    },
                    {
                        "id": 2887,
                        "name": "Smali",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2888,
                        "name": "Smalltalk",
                        "color": "#596706",
                        "frameworks": []
                    },
                    {
                        "id": 2889,
                        "name": "Smarty",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2890,
                        "name": "SourcePawn",
                        "color": "#5c7611",
                        "frameworks": []
                    },
                    {
                        "id": 2891,
                        "name": "Squirrel",
                        "color": "#800000",
                        "frameworks": []
                    },
                    {
                        "id": 2892,
                        "name": "Standard ML",
                        "color": "#dc566d",
                        "frameworks": []
                    },
                    {
                        "id": 2893,
                        "name": "Stata",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2894,
                        "name": "Stylus",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2895,
                        "name": "SuperCollider",
                        "color": "#46390b",
                        "frameworks": []
                    },
                    {
                        "id": 2896,
                        "name": "Swift",
                        "color": "#ffac45",
                        "frameworks": []
                    },
                    {
                        "id": 2897,
                        "name": "SystemVerilog",
                        "color": "#DAE1C2",
                        "frameworks": []
                    },
                    {
                        "id": 2898,
                        "name": "TOML",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2899,
                        "name": "TXL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2900,
                        "name": "Tcl",
                        "color": "#e4cc98",
                        "frameworks": []
                    },
                    {
                        "id": 2901,
                        "name": "Tcsh",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2902,
                        "name": "TeX",
                        "color": "#3D6117",
                        "frameworks": []
                    },
                    {
                        "id": 2903,
                        "name": "Tea",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2904,
                        "name": "Text",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2905,
                        "name": "Textile",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2906,
                        "name": "Thrift",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2907,
                        "name": "Turing",
                        "color": "#45f715",
                        "frameworks": []
                    },
                    {
                        "id": 2908,
                        "name": "Turtle",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2909,
                        "name": "Twig",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2910,
                        "name": "TypeScript",
                        "color": "#2b7489",
                        "frameworks": []
                    },
                    {
                        "id": 2911,
                        "name": "Unified Parallel C",
                        "color": "#4e3617",
                        "frameworks": []
                    },
                    {
                        "id": 2912,
                        "name": "Unity3D Asset",
                        "color": "#ab69a1",
                        "frameworks": []
                    },
                    {
                        "id": 2913,
                        "name": "UnrealScript",
                        "color": "#a54c4d",
                        "frameworks": []
                    },
                    {
                        "id": 2914,
                        "name": "VCL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2915,
                        "name": "VHDL",
                        "color": "#adb2cb",
                        "frameworks": []
                    },
                    {
                        "id": 2916,
                        "name": "Vala",
                        "color": "#fbe5cd",
                        "frameworks": []
                    },
                    {
                        "id": 2917,
                        "name": "Verilog",
                        "color": "#b2b7f8",
                        "frameworks": []
                    },
                    {
                        "id": 2918,
                        "name": "VimL",
                        "color": "#199f4b",
                        "frameworks": []
                    },
                    {
                        "id": 2919,
                        "name": "Visual Basic",
                        "color": "#945db7",
                        "frameworks": []
                    },
                    {
                        "id": 2920,
                        "name": "Volt",
                        "color": "#1F1F1F",
                        "frameworks": []
                    },
                    {
                        "id": 2921,
                        "name": "Web Ontology Language",
                        "color": "#9cc9dd",
                        "frameworks": []
                    },
                    {
                        "id": 2922,
                        "name": "WebIDL",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2923,
                        "name": "XC",
                        "color": "#99DA07",
                        "frameworks": []
                    },
                    {
                        "id": 2924,
                        "name": "XML",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2925,
                        "name": "XProc",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2926,
                        "name": "XQuery",
                        "color": "#5232e7",
                        "frameworks": []
                    },
                    {
                        "id": 2927,
                        "name": "XS",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2928,
                        "name": "XSLT",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2929,
                        "name": "Xojo",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2930,
                        "name": "Xtend",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2931,
                        "name": "YAML",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2932,
                        "name": "Yacc",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2933,
                        "name": "Zephir",
                        "color": "#118f9e",
                        "frameworks": []
                    },
                    {
                        "id": 2934,
                        "name": "Zimpl",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2935,
                        "name": "desktop",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2936,
                        "name": "eC",
                        "color": "#913960",
                        "frameworks": []
                    },
                    {
                        "id": 2937,
                        "name": "edn",
                        "color": "#db5855",
                        "frameworks": []
                    },
                    {
                        "id": 2938,
                        "name": "fish",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2939,
                        "name": "mupad",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2940,
                        "name": "nesC",
                        "color": "#94B0C7",
                        "frameworks": []
                    },
                    {
                        "id": 2941,
                        "name": "ooc",
                        "color": "#b0b77e",
                        "frameworks": []
                    },
                    {
                        "id": 2942,
                        "name": "reStructuredText",
                        "color": "#FFFFFF",
                        "frameworks": []
                    },
                    {
                        "id": 2943,
                        "name": "wisp",
                        "color": "#7582D1",
                        "frameworks": []
                    },
                    {
                        "id": 2944,
                        "name": "xBase",
                        "color": "#403a40",
                        "frameworks": []
                    },
                    {
                        "id": 2732,
                        "name": "Java",
                        "color": "#b07219",
                        "frameworks": [
                            "Android",
                            "Spring",
                            "GWT",
                            "Cocoon",
                            "Aranea",
                            "JSF",
                            "AppFuse",
                            "Struts"
                        ]
                    }
                ],
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