const supertypes_pie = [{
    "Vegetable": 0,
    "Fruit": 0,
    "Herb": 0,
    "Flower": 0
}]
const all_relationships = [{
    'Fruit': {
        'Nut': ['Almond'],
        'Pome Fruit': ['Apple'],
        'Berry': ['Blackberry', 'Blueberry', 'Gooseberry', 'Kei Apple', 'Strawberry'],
        'False Fruit': ['Fig'],
        'Vine Fruit': ['Granadilla', 'Grape'],
        'Citrus': ['Grapefruit', 'Lemon', 'Naartjie', 'Orange', 'Lime']
    },
    'Vegetable': {
        'Nightshade': ['Aubergine', 'Chilli', 'Pepper', 'Tomato'],
        'Legume': ['Bean', 'Pea'],
        'Root': ['Beetroot', 'Carrot', 'Jerusalem Artichoke', 'Radish','Sweet Potato', 'Turnip', 'Ginger'],
        'Cruciferous': ['Broccoli', 'Cabbage', 'Cauliflower', 'Kale'],
        'Cucurbit': ['Squash', 'Pumpkin', 'Cucumber', 'Zucchini'],
        'Stalk': ['Celery', 'Rhubarb'],
        'Leaf': ['Lettuce', 'Mustard Leaf', 'Sorrel', 'Spinach']
    },
    'Herb': {
        'Soft Herb': ['Basil', 'Coriander', 'Fennel', 'Lemon Balm', 'Mint', 'Parsley'],
        'Woody Herb': ['Curry Leaf', 'Oregano', 'Rosemary', 'Sage', 'Thyme'],
    },
    'Flower': {
        'Flower': ['Artichoke', 'Edible Flower', 'Nasturtium'],
        'Seed': ['Sunflower Seed'],
    },
    'Allium': {
        'Vegetable': ['Chive', 'Onion', 'Onion', 'Leek', 'Onion'],
    }
}]
const super_to_type = [{
    "Fruit": ["Nut", "Pome Fruit", "Berry", "Vine Fruit", "Citrus", "False Fruit", "Stone Fruit"],
    "Flower": ["Flower"],
    "Vegetable": ["Nightshade", "Legume", "Cruciferous", "Cucurbit", "Root", "Stalk", "Allium", "Leaf"],
    "Herb": ["Soft Herb", "Woody Herb", "Hard Herb"],
    "Seed": ["Seed"]
}
]

const type_to_sub = [{
    "Nut": ["Almond"],
    "Pome Fruit": ["Apple"],
    "Flower": ["Artichoke", "Edible Flower", "Nasturtium"],
    "Nightshade": ["Aubergine", "Chilli", "Pepper", "Tomato"],
    "Legume": ["Bean", "Pea"],
    "Cruciferous": ["Broccoli", "Cabbage", "Cauliflower", "Kale"],
    "Cucurbit": ["Squash", "Cucumber", "Pumpkin", "Zucchini"],
    "Root": ["Beetroot", "Carrot", "Jerusalem Artichoke", "Ginger", "Radish", "Sweet Potato", "Turnip"],
    "Berry": ["Blackberry", "Blueberry", "Gooseberry", "Kei Apple", "Strawberry"],
    "Vine Fruit": ["Granadilla", "Grape"],
    "Citrus": ["Grapefruit", "Lemon", "Naartjie", "Orange", "Lime"],
    "Allium": ["Chive", "Leek", "Onion"],
    "Leaf": ["Lettuce", "Mustard Leaf", "Sorrel", "Spinach"],
    "Soft Herb": ["Basil", "Coriander", "Fennel", "Lemon Balm", "Mint", "Parsley"],
    "Woody Herb": ["Curry Leaf", "Oregano", "Rosemary", "Sage"],
    "Hard Herb": ["Lemon Verbena", "Marjoram", "Thyme"],
    "False Fruit": ["Fig"],
    "Stone Fruit": ["Peach", "Plum"],
    "Seed": ["Sunflower Seed"]
}]