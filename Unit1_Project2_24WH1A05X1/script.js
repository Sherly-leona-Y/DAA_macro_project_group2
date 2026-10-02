function generateTree() {

    const input = document.getElementById("arrayInput").value;

    const array = input
        .split(",")
        .map(Number)
        .filter(num => !isNaN(num));

    const divisionTree = document.getElementById("divisionTree");
    const mergeSteps = document.getElementById("mergeSteps");
    const finalArray = document.getElementById("finalArray");

    divisionTree.innerHTML = "";
    mergeSteps.innerHTML = "";
    finalArray.innerHTML = "";

    if (array.length !== 8) {
        divisionTree.innerHTML =
            "<p>Please enter exactly 8 numbers.</p>";
        return;
    }

    /* -----------------------------
       PART 1: RECURSIVE DIVISION
    ----------------------------- */

    let levels = [];

    function divide(arr, level) {

        if (!levels[level]) {
            levels[level] = [];
        }

        levels[level].push([...arr]);

        if (arr.length > 1) {

            const middle = Math.floor(arr.length / 2);

            const left = arr.slice(0, middle);
            const right = arr.slice(middle);

            divide(left, level + 1);
            divide(right, level + 1);
        }
    }

    divide(array, 0);

    levels.forEach((level, index) => {

        const levelDiv = document.createElement("div");
        levelDiv.className = "tree-level";

        const label = document.createElement("div");
        label.className = "level-label";
        label.textContent = "Level " + index;

        levelDiv.appendChild(label);

        level.forEach(arr => {

            const node = document.createElement("div");
            node.className = "node";

            node.textContent = "[" + arr.join(", ") + "]";

            levelDiv.appendChild(node);
        });

        divisionTree.appendChild(levelDiv);
    });


    /* -----------------------------
       PART 2: MERGE SORT
    ----------------------------- */

    let mergeHistory = [];

    function merge(left, right) {

        let result = [];

        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {

            if (left[i] <= right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        while (i < left.length) {
            result.push(left[i]);
            i++;
        }

        while (j < right.length) {
            result.push(right[j]);
            j++;
        }

        return result;
    }


    function mergeSort(arr) {

        if (arr.length <= 1) {
            return arr;
        }

        const middle = Math.floor(arr.length / 2);

        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        const sortedLeft = mergeSort(left);
        const sortedRight = mergeSort(right);

        const merged = merge(sortedLeft, sortedRight);

        mergeHistory.push({
            left: [...sortedLeft],
            right: [...sortedRight],
            result: [...merged]
        });

        return merged;
    }


    const sortedArray = mergeSort(array);


    /* -----------------------------
       DISPLAY MERGING STEPS
    ----------------------------- */

    mergeHistory.forEach((step, index) => {

        const stepDiv = document.createElement("div");
        stepDiv.className = "merge-step";

        const leftBox = document.createElement("div");
        leftBox.className = "merge-box";
        leftBox.textContent =
            "[" + step.left.join(", ") + "]";

        const plus = document.createElement("div");
        plus.className = "arrow";
        plus.textContent = "+";

        const rightBox = document.createElement("div");
        rightBox.className = "merge-box";
        rightBox.textContent =
            "[" + step.right.join(", ") + "]";

        const arrow = document.createElement("div");
        arrow.className = "arrow";
        arrow.textContent = "→";

        const resultBox = document.createElement("div");
        resultBox.className = "merged-result";
        resultBox.textContent =
            "[" + step.result.join(", ") + "]";

        stepDiv.appendChild(leftBox);
        stepDiv.appendChild(plus);
        stepDiv.appendChild(rightBox);
        stepDiv.appendChild(arrow);
        stepDiv.appendChild(resultBox);

        mergeSteps.appendChild(stepDiv);
    });


    /* -----------------------------
       FINAL SORTED ARRAY
    ----------------------------- */

    const finalBox = document.createElement("div");
    finalBox.className = "final-array";

    finalBox.textContent =
        "[" + sortedArray.join(", ") + "]";

    finalArray.appendChild(finalBox);
}


/* Generate the default tree when page loads */

generateTree();
