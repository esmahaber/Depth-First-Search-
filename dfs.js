var current_counter = 1;
var reveal_counter = 1;
var last_counter = 1;
var prepost = [];
var i = 1;
var count = 0;
//DFS karmaşıklığını tutar
var complexity;

for (i = 1; i < 10; i++) {
  prepost.push([i, 0, 0]);
}
console.log(prepost);

Raphael.fn.connection = function (obj1, obj2, line, bg) {
  if (obj1.line && obj1.from && obj1.to) {
    line = obj1;
    obj1 = line.from;
    obj2 = line.to;
  }
  var bb1 = obj1.getBBox(),
    bb2 = obj2.getBBox(),
    p = [{ x: bb1.x + bb1.width / 2, y: bb1.y - 1 },
    { x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1 },
    { x: bb1.x - 1, y: bb1.y + bb1.height / 2 },
    { x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2 },
    { x: bb2.x + bb2.width / 2, y: bb2.y - 1 },
    { x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1 },
    { x: bb2.x - 1, y: bb2.y + bb2.height / 2 },
    { x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2 }],
    d = {}, dis = [];
  for (var i = 0; i < 4; i++) {
    for (var j = 4; j < 8; j++) {
      var dx = Math.abs(p[i].x - p[j].x),
        dy = Math.abs(p[i].y - p[j].y);
      if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
        dis.push(dx + dy);
        d[dis[dis.length - 1]] = [i, j];
      }
    }
  }
  if (dis.length == 0) {
    var res = [0, 4];
  } else {
    res = d[Math.min.apply(Math, dis)];
  }
  var x1 = p[res[0]].x,
    y1 = p[res[0]].y,
    x4 = p[res[1]].x,
    y4 = p[res[1]].y;
  dx = Math.max(Math.abs(x1 - x4) / 2, 10);
  dy = Math.max(Math.abs(y1 - y4) / 2, 10);
  var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
    y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
    x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
    y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
  var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
  if (line && line.line) {
    line.bg && line.bg.attr({ path: path });
    line.line.attr({ path: path });
  } else {
    var color = typeof line == "string" ? line : "#000";
    return {
      bg: bg && bg.split && this.path(path).attr({ stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3 }),
      line: this.path(path).attr({ stroke: color, fill: "none" }),
      from: obj1,
      to: obj2
    };
  }
};

var el;
window.onload = function () {
  var clickMe = document.getElementById("button");
  var dragger = function () {
    console.log("hit");
    this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
    this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
    this.animate({ "fill-opacity": .2 }, 500);
  },
    move = function (dx, dy) {
      var att = this.type == "rect" ? { x: this.ox + dx, y: this.oy + dy } : { cx: this.ox + dx, cy: this.oy + dy };
      this.attr(att);
      for (var i = connections.length; i--;) {
        r.connection(connections[i]);
      }
      r.safari();
    },
    up = function () { //GET RID
      console.log("real hit")
      this.animate({ "fill-opacity": 0 }, 500);
    },
    r = Raphael("holder", 640, 480),
    connections = [],
    shapes = [r.ellipse(190, 175, 20, 20),
    r.ellipse(300, 175, 20, 20),
    r.ellipse(190, 250, 20, 20),
    r.ellipse(300, 100, 20, 20),
    r.ellipse(800, 100, 20, 20),
    r.ellipse(300, 250, 20, 20),
    r.ellipse(500, 100, 20, 20),
    r.ellipse(500, 200, 20, 20),
    r.ellipse(300, 350, 20, 20)
    ];
  text = [r.text(300, 100, "1", 20, 20),
  r.text(300, 175, "3", 20, 20),
  r.text(190, 250, "4", 20, 20),
  r.text(190, 175, "2", 20, 20),
  r.text(800, 100, "5", 20, 20),
  r.text(300, 250, "5", 20, 20),
  r.text(500, 100, "7", 20, 20),
  r.text(500, 200, "8", 20, 20),
  r.text(300, 350, "6", 20, 20)
  ];
  var color = Raphael.getColor();
  for (var i = 0, ii = shapes.length; i < ii; i++) {
    shapes[i].attr({ fill: color, stroke: color, "fill-opacity": 100, "stroke-width": 2 });
  }

  for (var i = 0, ii = text.length; i < ii; i++) {
    text[i].attr({ fill: '#000000', "fill-opacity": 100 });
  }

  function reveal2() {
    console.log("HITT " + last_counter);

    console.log("HITT");
    for (var i = 0, ii = shapes.length; i < ii; i++) {
      if (last_counter == 1 && i == 3) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div7").innerHTML = (last_counter);
        document.getElementById("console").innerHTML += (last_counter);
      }
      if (last_counter == 2 && i == 0) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div6").innerHTML = (last_counter);
        document.getElementById("console").innerHTML += (last_counter);
      }
      if (last_counter == 3 && i == 1) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div5").innerHTML = (last_counter);
        document.getElementById("console").innerHTML += (last_counter);
      }
      if (last_counter == 4 && i == 5) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div4").innerHTML = (i);
        document.getElementById("console").innerHTML += (i);
      }
      if (last_counter == 5 && i == 2) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div3").innerHTML = (4);
        document.getElementById("console").innerHTML += (4);
      }
      if (last_counter == 6 && i == 2) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div3").innerHTML = ("");
      }
      if (last_counter == 7 && i == 8) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div3").innerHTML = (6);
        document.getElementById("console").innerHTML += (6);
      }
      if (last_counter == 8 && i == 8) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div3").innerHTML = ("");
      }
      if (last_counter == 9 && i == 5) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div4").innerHTML = ("");
      }
      if (last_counter == 10 && i == 6) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div3").innerHTML = (7);
        document.getElementById("console").innerHTML += (7);
      }
      if (last_counter == 11 && i == 7) {
        shapes[i].attr({ fill: "#fe8a39", stroke: "#fe8a39", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div2").innerHTML = (8);
        document.getElementById("console").innerHTML += (8);
      }
      if (last_counter == 12 && i == 7) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div2").innerHTML = ("");

      }
      if (last_counter == 13 && i == 6) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div3").innerHTML = ("");
      }
      if (last_counter == 14 && i == 1) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div5").innerHTML = ("");
      }
      if (last_counter == 15 && i == 0) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div6").innerHTML = ("");
      }
      if (last_counter == 16 && i == 3) {
        shapes[i].attr({ fill: "blue", stroke: "blue", "fill-opacity": 100, "stroke-width": 2 });
        document.getElementById("div7").innerHTML = ("");
      }
    }


    last_counter += 1;
  }

  console.log(shapes)
  connections.push(r.connection(shapes[0], shapes[1], "#000"));
  connections.push(r.connection(shapes[1], shapes[2], "#000"));
  connections.push(r.connection(shapes[1], shapes[3], "#000"));
  connections.push(r.connection(shapes[1], shapes[5], "#000"));
  connections.push(r.connection(shapes[1], shapes[6], "#000"));
  connections.push(r.connection(shapes[1], shapes[7], "#000"));
  connections.push(r.connection(shapes[0], shapes[3], "#000"));
  connections.push(r.connection(shapes[2], shapes[5], "#000"));
  connections.push(r.connection(shapes[0], shapes[2], "#000"));
  connections.push(r.connection(shapes[0], shapes[5], "#000"));
  connections.push(r.connection(shapes[5], shapes[8], "#000"));
  connections.push(r.connection(shapes[6], shapes[7], "#000"));
  $(clickMe).click(function () {
    reveal2();
  })
};

//karmaşıklık hesaplama
//n gelen visited
function complexity(n) {
  var v = n.length - 1;
  var base = v / 8;
  var i = 1;
  var result;
  while (base != 0) {
    i *= n;
    result = "n^" + i
    --base
  }
  console.log(result);
}

// graph oluşturma
class Graph {
  // düğüm
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  addVertex(v) {
    // boş dizi atandı
    this.AdjList.set(v, []);
  }
  addEdge(v, w) {
    //kenar birleştir
    this.AdjList.get(v).push(w);

    this.AdjList.get(w).push(v);
  }

  // vertexleri yazdırır
  printGraph() {

    var get_keys = this.AdjList.keys();

    //köşe tekrarı
    for (var i of get_keys) {

      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values)
        conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }

  //// DFS algoritma main fonksiyonu
  dfs(startingNode) {
    var visited = [];
    for (var i = 0; i < this.noOfVertices; i++)
      visited[i] = false;
    this.DFSUtil(startingNode, visited);

  }

  //recursive
  DFSUtil(vert, visited) {
    visited[vert] = true;
    count++;
    var j;
    for (j = 0; j < 8; j++) {
      if (dict[j].key == vert) {
        dict[j].value[0] = current_counter;
        current_counter++;
      }
    }
    console.log(vert);

    var get_neighbours = this.AdjList.get(vert);

    for (var i in get_neighbours) {
      var get_elem = get_neighbours[i];
      if (!visited[get_elem]) {
        this.DFSUtil(get_elem, visited);

      }

    }

    var k;
    for (k = 0; k < 8; k++) {
      if (dict[k].key == vert) {
        dict[k].value[1] = current_counter;
        current_counter++;
      }


    }


  }
}



var g = new Graph();
var vertices = ['1', '2', '3', '4', '5', '6', '7', '8'];

// köşeleri ekleme
for (var i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

g.addEdge('1', '2');
g.addEdge('1', '3');
g.addEdge('2', '3');
g.addEdge('2', '4');
g.addEdge('2', '5');
g.addEdge('4', '5');
g.addEdge('5', '6');
g.addEdge('3', '5');
g.addEdge('3', '7');
g.addEdge('3', '8');
g.addEdge('7', '8');

g.printGraph();

var dict = []; // boş dizi

dict.push({
  key: vertices[0],
  value: [0, 0]
});
dict.push({
  key: vertices[1],
  value: [0, 0]
});
dict.push({
  key: vertices[2],
  value: [0, 0]
});
dict.push({
  key: vertices[3],
  value: [0, 0]
});
dict.push({
  key: vertices[4],
  value: [0, 0]
});
dict.push({
  key: vertices[5],
  value: [0, 0]
});
dict.push({
  key: vertices[6],
  value: [0, 0]
});
dict.push({
  key: vertices[7],
  value: [0, 0]
});


console.log(dict);

console.log(typeof (dict[0].key));


console.log("DFS");
g.dfs("1");

console.log(dict);


function hideAll() {
  second.style.visibility = "hidden";
  third.style.visibility = "hidden";
  fourth.style.visibility = "hidden";
  fifth.style.visibility = "hidden";
  sixth.style.visibility = "hidden";
  seventh.style.visibility = "hidden";
  eigth.style.visibility = "hidden";
}

function addPost() {
  first.innerHTML += dict[0].value[1] + ']';
  second.innerHTML += dict[1].value[1] + ']';
  third.innerHTML += dict[2].value[1] + ']';
  fourth.innerHTML += dict[3].value[1] + ']';
  fifth.innerHTML += dict[4].value[1] + ']';
  sixth.innerHTML += dict[5].value[1] + ']';
  seventh.innerHTML += dict[6].value[1] + ']';
  eigth.innerHTML += dict[7].value[1] + ']';
}


hideAll();

