window.knapsackData = {
"capacity": 10,
"maxProfit": 160,
"totalWeight": 10,
"explored": 6,
"pruned": 6,
"selectedItems": [1, 2, 4],
"nodes": [
{"id": 0,"parent": -1,"level": -1,"weight": 0,"profit": 0,"bound": 164.00,"name": "Root","status": "Explored"},
{"id": 1,"parent": 0,"level": 0,"weight": 2,"profit": 40,"bound": 164.00,"name": "Include Item 1","status": "Explored"},
{"id": 2,"parent": 0,"level": 0,"weight": 0,"profit": 0,"bound": 152.00,"name": "Exclude Item 1","status": "Pruned"},
{"id": 3,"parent": 1,"level": 1,"weight": 5,"profit": 90,"bound": 164.00,"name": "Include Item 2","status": "Explored"},
{"id": 4,"parent": 1,"level": 1,"weight": 2,"profit": 40,"bound": 156.00,"name": "Exclude Item 2","status": "Pruned"},
{"id": 5,"parent": 3,"level": 2,"weight": 9,"profit": 150,"bound": 164.00,"name": "Include Item 3","status": "Explored"},
{"id": 6,"parent": 3,"level": 2,"weight": 5,"profit": 90,"bound": 160.00,"name": "Exclude Item 3","status": "Explored"},
{"id": 7,"parent": 5,"level": 3,"weight": 14,"profit": 220,"bound": 0.00,"name": "Include Item 4","status": "Overweight"},
{"id": 8,"parent": 5,"level": 3,"weight": 9,"profit": 150,"bound": 163.33,"name": "Exclude Item 4","status": "Explored"},
{"id": 9,"parent": 8,"level": 4,"weight": 15,"profit": 230,"bound": 0.00,"name": "Include Item 5","status": "Overweight"},
{"id": 10,"parent": 8,"level": 4,"weight": 9,"profit": 150,"bound": 150.00,"name": "Exclude Item 5","status": "Pruned"},
{"id": 11,"parent": 6,"level": 3,"weight": 10,"profit": 160,"bound": 160.00,"name": "Include Item 4","status": "Best solution"},
{"id": 12,"parent": 6,"level": 3,"weight": 5,"profit": 90,"bound": 156.67,"name": "Exclude Item 4","status": "Pruned"}
]
};
