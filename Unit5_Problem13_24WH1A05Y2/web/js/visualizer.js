
const data = window.knapsackData;

if (!data) {
    alert("Tree data not found! Run the C++ program first.");
    throw new Error("Missing knapsackData");
}

// ------------------------------------
// INITIAL SETUP
// ------------------------------------

const container = document.getElementById("tree-container");

const width = container.clientWidth;
const height = container.clientHeight;

const svg = d3.select("#tree-container")
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const treeGroup = svg.append("g");

// ------------------------------------
// CONVERT C++ NODES INTO TREE
// ------------------------------------

const nodeMap = new Map();

data.nodes.forEach(node => {
    nodeMap.set(node.id, {
        ...node,
        children: []
    });
});

data.nodes.forEach(node => {
    if (node.parent !== -1) {
        const parent = nodeMap.get(node.parent);

        if (parent) {
            parent.children.push(nodeMap.get(node.id));
        }
    }
});

const rootData = nodeMap.get(0);
const root = d3.hierarchy(rootData);

// ------------------------------------
// TREE LAYOUT
// ------------------------------------

const layout = d3.tree()
    .nodeSize([190, 155]);

layout(root);

const descendants = root.descendants();

const minX = d3.min(descendants, d => d.x);
const maxX = d3.max(descendants, d => d.x);

const offsetX = width / 2 - (minX + maxX) / 2;

treeGroup.attr(
    "transform",
    `translate(${offsetX}, 80)`
);

// ------------------------------------
// NODE COLORS
// ------------------------------------

function getColor(status) {

    if (status === "Pruned" || status === "Overweight")
        return "#d65b5b";

    if (status === "Best solution")
        return "#e5b84b";

    if (status === "Explored")
        return "#4c8edb";

    return "#3cbf86";
}

// ------------------------------------
// DRAW BRANCHES
// ------------------------------------

const links = treeGroup.selectAll(".link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y)
    )
    .attr("fill", "none")
    .attr("stroke", d =>
        ["Pruned", "Overweight"].includes(d.target.data.status)
            ? "#d65b5b"
            : "#50627e"
    )
    .attr("stroke-width", 3)
    .style("opacity", 0);

// ------------------------------------
// DRAW NODES
// ------------------------------------

const nodes = treeGroup.selectAll(".node")
    .data(descendants)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d =>
        `translate(${d.x},${d.y})`
    )
    .style("cursor", "pointer");

// Node circles
nodes.append("circle")
    .attr("r", 29)
    .attr("fill", d => getColor(d.data.status))
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2);

// Node ID
nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", 5)
    .attr("fill", "white")
    .attr("font-size", 14)
    .attr("font-weight", "bold")
    .text(d => d.data.id);

// Weight and profit
nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 45)
    .attr("fill", "#d9e0eb")
    .attr("font-size", 11)
    .text(d => `W:${d.data.weight} P:${d.data.profit}`);

// Upper bound
nodes.append("text")
    .attr("text-anchor", "middle")
    .attr("y", 60)
    .attr("fill", "#9ba8bd")
    .attr("font-size", 10)
    .text(d => `Bound: ${Number(d.data.bound).toFixed(2)}`);

// ------------------------------------
// NODE INFORMATION PANEL
// ------------------------------------

function showNodeInfo(node) {

    document.getElementById("node-info").innerHTML = `
        <div class="node-title">Node ${node.id}</div>
        <p><b>Decision:</b> ${node.name}</p>
        <p><b>Level:</b> ${node.level}</p>
        <p><b>Weight:</b> ${node.weight}</p>
        <p><b>Profit:</b> ${node.profit}</p>
        <p><b>Upper Bound:</b> ${Number(node.bound).toFixed(2)}</p>
        <p><b>Status:</b> ${node.status}</p>
    `;
}

// Click on node
nodes.on("click", (event, d) => {
    showNodeInfo(d.data);
});

// ------------------------------------
// ZOOM AND PAN
// ------------------------------------

svg.call(
    d3.zoom()
        .scaleExtent([0.2, 3])
        .on("zoom", event => {
            treeGroup.attr("transform", event.transform);
        })
);

// ------------------------------------
// UPDATE FINAL STATISTICS
// ------------------------------------

document.getElementById("max-profit").textContent =
    data.maxProfit;

document.getElementById("total-weight").textContent =
    data.totalWeight;

// ------------------------------------
// ANIMATION CONTROLS
// ------------------------------------

const orderedNodes = [...descendants].sort(
    (a, b) => a.data.id - b.data.id
);

let currentStep = 1;
let animationTimer = null;

const animationSpeed = 900;

// Initially show only root
nodes.style("opacity", d =>
    d.data.id === 0 ? 1 : 0
);

links.style("opacity", 0);

// Update counters
function updateStats() {

    const visibleNodes = orderedNodes.filter(
        d => d.data.id < currentStep
    );

    const exploredCount = visibleNodes.filter(
        d => d.data.status === "Explored"
    ).length;

    const prunedCount = visibleNodes.filter(
        d => ["Pruned", "Overweight"].includes(d.data.status)
    ).length;

    document.getElementById("nodes-explored").textContent =
        exploredCount;

    document.getElementById("branches-pruned").textContent =
        prunedCount;

}

// ------------------------------------
// NEXT STEP
// ------------------------------------

function nextStep() {

    if (currentStep >= orderedNodes.length) {
        pauseAnimation();
        document.getElementById("status").textContent = "COMPLETED";
        return;
    }

    const nextNode = orderedNodes[currentStep];

    // Reveal node
    nodes.filter(d => d.data.id === nextNode.data.id)
        .transition()
        .duration(450)
        .style("opacity", 1);

    // Reveal connecting branch
    links.filter(d =>
        d.target.data.id === nextNode.data.id
    )
        .transition()
        .duration(450)
        .style("opacity", 1);

    showNodeInfo(nextNode.data);

    currentStep++;

    updateStats();

    if (currentStep >= orderedNodes.length) {
        pauseAnimation();
        document.getElementById("status").textContent = "COMPLETED";
    }
}

// ------------------------------------
// PLAY
// ------------------------------------

function playAnimation() {

    if (animationTimer !== null)
        return;

    if (currentStep >= orderedNodes.length)
        resetAnimation();

    document.getElementById("status").textContent = "PLAYING";

    animationTimer = setInterval(
        nextStep,
        animationSpeed
    );
}

// ------------------------------------
// PAUSE
// ------------------------------------

function pauseAnimation() {

    if (animationTimer !== null) {
        clearInterval(animationTimer);
        animationTimer = null;
    }

    if (currentStep < orderedNodes.length) {
        document.getElementById("status").textContent = "PAUSED";
    }
}

// ------------------------------------
// RESET
// ------------------------------------

function resetAnimation() {

    pauseAnimation();

    currentStep = 1;

    nodes.interrupt()
        .style("opacity", d =>
            d.data.id === 0 ? 1 : 0
        );

    links.interrupt()
        .style("opacity", 0);

    document.getElementById("node-info").innerHTML = `
        <p>Press Play or Next Step to begin.</p>
    `;

    updateStats();

    document.getElementById("status").textContent = "READY";
}

// ------------------------------------
// CONNECT BUTTONS
// ------------------------------------

document.getElementById("playButton")
    .onclick = playAnimation;

document.getElementById("pauseButton")
    .onclick = pauseAnimation;

document.getElementById("stepButton")
    .onclick = () => {
        pauseAnimation();
        nextStep();
    };

document.getElementById("resetButton")
    .onclick = resetAnimation;

// ------------------------------------
// INITIAL STATE
// ------------------------------------

updateStats();

document.getElementById("status").textContent = "READY";

document.getElementById("node-info").innerHTML = `
    <p>Press Play or Next Step to begin.</p>
`;