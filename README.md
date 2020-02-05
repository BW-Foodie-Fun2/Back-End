# Back-End Documentation

#### API Base Url: 
https://foodiefunbw.herokuapp.com/

## Design Details
- [Foodie Fun Trello](https://trello.com/b/rHE7FNzJ/foodiefun)
- [Foodie Fun PVD](https://www.notion.so/PVD-Foodie-Fun-2-7e0829ebab294ed6bc92174202bb82d7)
- [Figma inc. MVP & Pitch](https://www.figma.com/file/A7hFua2tl6OmWGl5XzHyWi/FoodieFun-Devs?node-id=70%3A0)
- [Back End Build Week Rubric](https://www.notion.so/Web-Unit-4-Node-ac50a1d0cf0a4941a1b20cd28a1c03c6)

---
## Register New User
---
_HTTP Method: [POST]_  
__URL: /api/auth/register__

Schema:

| Name | Type  | Required | description |
|------|:-----:|:---------:|:-----:|
|username | string | yes | unique username|
|password | string  | yes | password |
|email | string | yes | unique email |
|location | string | yes | string |

_Example_

```
{
	"username": "EthanHoover0",
	"password": "123",
	"email": "ethanhoovernamename@gmail.com",
	"location": "Las Vegas"
}
```

_The returned object will be:_

```
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkV0aGFuSG9vdmVyMCIsImlhdCI6MTU4MDc5MTkxOCwiZXhwIjoxNTgwODc4MzE4fQ.lw7pcQD_JXyhI4NOL1TjjMbUiggNs-ShFhWWfhk7xlU",
    "message": "Welcome EthanHoover0"
}
```

---
## Login
----

_HTTP Method: [POST]_  
__URL: /api/auth/login__

Schema:

| Name | Type  | Required | description |
|------|:-----:|:---------:|:-----:|
|username | string | yes | unique username|
|password | string  | yes | password |

_Example_

```
{
	"username": "EthanHoover0",
	"password": "123"
}
```

_The returned object will be:_

```
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkV0aGFuSG9vdmVyMCIsImlhdCI6MTU4MDc5MTkxOCwiZXhwIjoxNTgwODc4MzE4fQ.lw7pcQD_JXyhI4NOL1TjjMbUiggNs-ShFhWWfhk7xlU",
    "message": "Welcome back EthanHoover0!"
}
```

---
## Submit Review
------
_HTTP Method: [POST]_  
__URL: /api/reviews__

Must be validated user with token

Schema:

| Name | Type  | Required | description |
|------|:-----:|:---------:|:-----:|
|menu_item| string | yes | name of item from menu|
|item_price | integer | yes | price of item|
|item_rating | integer | yes | number rating of item |
| restaurant_id | integer | yes | the id given to a restaurant |
|item_review | string | yes | review of item|
|item_image_url| string  | yes | picture of item in jpg form |
|date_visited | date  | yes | date of visitation |

_Example_

```
{
	      "menu_item": "burrito",
          "item_price": 6.50,
          "item_rating": 4,
          "restaurant_id": 2,
          "item_review": "Yeah it was okay.",
          "item_image_url": "https://www.mrbreakfast.com/images/1077_spicy_cheesy_eggs.jpg",
          "date_visited": "2020-1-05"
}
```

_The returned object:_

```
{
    "id": 4,
    "menu_item": "burrito",
    "item_price": 6.5,
    "item_rating": 4,
    "item_review": "Yeah it was okay.",
    "restaurant_id": 2,
    "reviewed_by": "EthanHoover",
    "item_image_url": "https://www.mrbreakfast.com/images/1077_spicy_cheesy_eggs.jpg",
    "created_at": "2020-02-04 04:59:46",
    "updated_at": "2020-02-04 04:59:46",
    "date_visited": "2020-1-05"
}
```
---

## Update a Review
---
_HTTP Method: [PUT]_  
__URL: /api/reviews/:id__

Must be validated user with token

Schema:

| Name | Type  | Required | description |
|------|:-----:|:---------:|:-----:|
|menu_item| string | yes/no | name of item from menu|
|item_price | integer | yes/no | price of item|
|item_rating | integer | yes/no | number rating of item |
| restaurant_id | integer | yes/no | the id given to a restaurant |
|item_review | string | yes/no | review of item|
|item_image_url| string  | yes/no | picture of item in jpg form |
|date_visited | date  | yes/no | date of visitation |

_Example_

```
{
	"name": "Nice Sweet Potatoes"
}
```

_The returned object will be the same as the updated fields above_

```
{
    "name": "Nice Sweet Potatoes"
}
```
---

## Retrieve All Reviews
-------------------
_HTTP Method: [GET]_  
__URL: /api/reviews__

_The returned object will look like:_

```
[
    {
        "id": 1,
        "menu_item": "Mushroom Burger",
        "item_price": 8,
        "item_rating": 5,
        "item_review": "Nice well cooked shroom burger!",
        "restaurant_id": 1,
        "reviewed_by": "ethan",
        "item_image_url": "https://www.simplyrecipes.com/wp-content/uploads/2011/06/grilled-beef-mushroom-burgers-verrtical-a-1800.jpg",
        "created_at": "2020-02-03 20:39:38",
        "updated_at": "2020-02-03 20:39:38",
        "date_visited": "2020-1-20"
    },
    {
        "id": 2,
        "menu_item": "Cheesy Bean Burrito",
        "item_price": 7,
        "item_rating": 3,
        "item_review": "Okay burrito, too cheesy.",
        "restaurant_id": 3,
        "reviewed_by": "kelly",
        "item_image_url": "https://images-gmi-pmc.edge-generalmills.com/074a3680-3adc-4aae-85f5-1e3a4f2caa34.jpg",
        "created_at": "2020-02-03 20:39:38",
        "updated_at": "2020-02-03 20:39:38",
        "date_visited": "2020-1-10"
    },
]
```
---

## Delete a Review
---
_HTTP Method: [DELETE]_  
__URL: /api/reviews/:id__
Must be validated user with token

Schema:

| Name | Type  | Required | description |
|------|:-----:|:---------:|:-----:|
|id| integer | yes | review id|


_Example_

```
[url]/api/user/:id
```

_returns:_

```
nothing as of right now
```
---

## Retrieve All Reviews
-------------------
_HTTP Method: [GET]_  
__URL: /api/:username/reviews__

_The returned object will look like:_

```
[
    {
        "id": 4,
        "menu_item": "burrito",
        "item_price": 6.5,
        "item_rating": 4,
        "item_review": "Yeah it was okay.",
        "restaurant_id": 2,
        "reviewed_by": "EthanHoover0",
        "item_image_url": "https://www.mrbreakfast.com/images/1077_spicy_cheesy_eggs.jpg",
        "created_at": "2020-02-04 18:21:54",
        "updated_at": "2020-02-04 18:21:54",
        "date_visited": "2020-1-05"
    },
    {
        "id": 5,
        "menu_item": "Super Amazing Salad",
        "item_price": 20.5,
        "item_rating": 5,
        "item_review": "Yeah it was amazing.",
        "restaurant_id": 1,
        "reviewed_by": "EthanHoover0",
        "item_image_url": "https://www.mrbreakfast.com/images/1077_spicy_cheesy_eggs.jpg",
        "created_at": "2020-02-04 18:25:37",
        "updated_at": "2020-02-04 18:25:37",
        "date_visited": null
    }
]
```

## Submit a Restaurant
------
_HTTP Method: [POST]_  
__URL: /api/restaurants__

Must be validated user with token

Schema:

| Name | Type  | Required | description |
|------|:-----:|:---------:|:-----:|
|name| string | yes | name of restaurant|
|cuisine_id | integer | yes | type of cusine|
|location | string | yes | location of restaurant |
|hours_of_operation | string | yes | hours of operation |
|img_url| string | yes | picture of restaurant in jpg form|
|created_by| string  | yes | username |


_Example_

```
{
	    "name": "Nicole's Cafe",
	    "cuisine_id": 1,
        "location": "San Diego, CA",
        "hours_of_operation": "9:00AM - 9:00PM",
        "img_url": "https://koreatownladirectory.com/wpcontent/uploads/2015/02/nicoles-cafe-koreatown-plaza.jpg",
        "created_by": "nicole"
}
```

_The returned object:_

```
{
    "id": 23,
    "name": "Nicole's Cafe",
    "cuisine_id": 1,
    "location": "San Diego, CA",
    "hours_of_operation": "9:00AM - 9:00PM",
    "img_url": "https://koreatownladirectory.com/wpcontent/uploads/2015/02/nicoles-cafe-koreatown-plaza.jpg",
    "created_by": "nicole",
    "created_at": "2020-02-05 00:46:48",
    "updated_at": "2020-02-05 00:46:48"
}
```
---

## Update a Restaurant
---
_HTTP Method: [PUT]_  
__URL: /api/restaurants/:id__

Must be validated user with token

---

## Retrieve All Restaurants
-------------------
_HTTP Method: [GET]_  
__URL: /api/restaurants__

_The returned object will look like:_

```
[
    {
       "id": 1,
        "name": "Nikki's Cafe",
        "cuisine_id": 2,
        "location": "Las Vegas, NV",
        "hours_of_operation": "7:00AM - 1PM",
        "img_url": "https://media-cdn.tripadvisor.com/media/photo-s/08/1b/0a/26/egg-works.jpg",
        "created_by": "josh",
        "created_at": "2020-02-04 16:58:37",
        "updated_at": "2020-02-04 16:58:37"
  },
  {
        "id": 2,
        "name": "Zabas",
        "cuisine_id": 47,
        "location": "Las Vegas, NV",
        "hours_of_operation": "11:00AM - 9PM",
        "img_url": "https://s3-media2.fl.yelpcdn.com/bphoto/K5Y2LW7ayGM_InqMtXRNPg/o.jpg",
        "created_by": "kelly",
        "created_at": "2020-02-04 16:58:37",
        "updated_at": "2020-02-04 16:58:37"
    },
]
```
---

## Delete a Restaurant
---
_HTTP Method: [DELETE]_  
__URL: /api/restaurants/:id__
Must be validated user with token

Schema:

| Name | Type  | Required | description |
|------|:-----:|:---------:|:-----:|
|id| integer | yes | restaurant id|


_Example_

```
[url]/api/restaurants/1
```

_returns:_

```
Count of records deleted
```
---

## Retrieve Reviews by Restaurant
-------------------
_HTTP Method: [GET]_  
__URL: /api/:restaurant_id/reviews__

_The returned object will look like:_

```
[
    {
        "id": 3,
        "menu_item": "Cheesy eggs",
        "item_price": 6.5,
        "item_rating": 4,
        "item_review": "Yeah it was okay.",
        "restaurant_id": 2,
        "reviewed_by": "josh",
        "item_image_url": "https://www.mrbreakfast.com/images/1077_spicy_cheesy_eggs.jpg",
        "created_at": "2020-02-04 16:58:37",
        "updated_at": "2020-02-04 16:58:37",
        "date_visited": "2020-1-05"
  },
  {
        "id": 4,
        "menu_item": "burrito",
        "item_price": 6.5,
        "item_rating": 4,
        "item_review": "Yeah it was okay.",
        "restaurant_id": 2,
        "reviewed_by": "EthanHoover0",
        "item_image_url": "https://www.mrbreakfast.com/images/1077_spicy_cheesy_eggs.jpg",
        "created_at": "2020-02-04 18:21:54",
        "updated_at": "2020-02-04 18:21:54",
        "date_visited": "2020-1-05"
    }
]
```