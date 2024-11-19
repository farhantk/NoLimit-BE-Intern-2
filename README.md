
# NoLimit Test Case 2

Api Collection (Postman): [ApiCollection]

## Installation

```sh
git clone https://github.com/farhantk/NoLimit-BE-Intern-2.git
cd NoLimit-BE-Intern-2
npm install
npm run dev
```

# Elastic API Spec

## Create Elastic Index

Endpoint: PUT http://127.0.0.1:9200/companydatabase?pretty

Content-Type: application/json

Request Body:

```json
{
    "mappings": {
        "employees": {
            "properties": {
                "Address": {
                    "type": "text"
                },
                "Age": {
                    "type": "integer"
                },
                "DateOfJoining": {
                    "type": "date"
                },
                "Designation": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                    }
                },
                "FirstName": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                    }
                },
                "Gender": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                    }
                },
                "Interests": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                    }
                },
                "LastName": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                    }
                },
                "MaritalStatus": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                    }
                },
                "Salary": {
                    "type": "integer"
                }
            }
        }
    }
}
```

Response Body:

```json
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "companydatabase"
}
```
## Store data

Endpoint: POST http://127.0.0.1:9200/companydatabase/_bulk

Content-Type: binary


## Verify data

Endpoint: GET http://127.0.0.1:9200/companydatabase/_count?pretty=true

Response Body:

```json
{
  "count" : 50000,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  }
}
```

# NestJS API Spec

## Count of Employees

Endpoint: GET http://localhost:3000/count?index=companydatabase

Response Body:

```json
{
  "count" : 50000,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  }
}
```
## Average Salary

Endpoint: GET http://localhost:3000/averagesalary?index=companydatabase

Response Body:

```json
{
  "count" : 50000,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  }
}
```
## Minimum and Maximum Salary

Endpoint: GET http://localhost:3000/minmaxsalary?index=companydatabase

Response Body:

```json
{
    "minSalary": 25000,
    "maxSalary": 154000
}
```
## Age Distribution

Endpoint: GET http://localhost:3000/agedistribution?index=companydatabase

Response Body:

```json
[
    {
        "ageRange": "20 - 25",
        "count": 3572
    },
    {
        "ageRange": "25 - 30",
        "count": 25766
    },
    {
        "ageRange": "30 - 35",
        "count": 16066
    },
    {
        "ageRange": "35 - 40",
        "count": 2810
    },
    {
        "ageRange": "40 - 45",
        "count": 658
    },
    {
        "ageRange": "45 - 50",
        "count": 424
    },
    {
        "ageRange": "50 - 55",
        "count": 339
    },
    {
        "ageRange": "55 - 60",
        "count": 188
    },
    {
        "ageRange": "60 - 65",
        "count": 141
    },
    {
        "ageRange": "65 - 70",
        "count": 36
    }
]
```
## Gender Distribution

Endpoint: GET http://localhost:3000/genderdistribution?index=companydatabase

Response Body:

```json
[
    {
        "gender": "Male",
        "count": 25083
    },
    {
        "gender": "Female",
        "count": 24917
    }
]
```
## Marital Status Distribution

Endpoint: GET http://localhost:3000/maritaldistribution?index=companydatabase

Response Body:

```json
[
    {
        "marital": "Unmarried",
        "count": 25001
    },
    {
        "marital": "Married",
        "count": 24999
    }
]
```
## Date of Joining Histogram

Endpoint: GET http://localhost:3000/dateofjoining?index=companydatabase

Response Body:

```json
[
    ....
    {
        "date": "2016-09",
        "count": 757
    },
    {
        "date": "2016-10",
        "count": 72
    },
    {
        "date": "2016-11",
        "count": 86
    },
    {
        "date": "2016-12",
        "count": 92
    },
    {
        "date": "2017-01",
        "count": 4
    }
]
```
## Top Interests

Endpoint: GET http://localhost:3000/interestdistribution?index=companydatabase

Response Body:

```json
[
    {
        "interest": "Collecting RPM Records",
        "count": 28
    },
    {
        "interest": "Learning A Foreign Language",
        "count": 28
    },
    {
        "interest": "Wine Making",
        "count": 20
    },
    {
        "interest": "Birding",
        "count": 19
    },
    {
        "interest": "Lacrosse",
        "count": 19
    },
    {
        "interest": "Making Model Cars",
        "count": 19
    },
    {
        "interest": "Coloring",
        "count": 18
    },
    {
        "interest": "Gun Collecting",
        "count": 18
    },
    {
        "interest": "Skateboarding",
        "count": 18
    },
    {
        "interest": "Volunteer",
        "count": 18
    }
]
```
## Designation Distribution

Endpoint: GET http://localhost:3000/designationdistribution?index=companydatabase

Response Body:

```json
[
    {
        "designation": "Software Engineer",
        "count": 30112
    },
    {
        "designation": "Senior Software Engineer",
        "count": 8601
    },
    {
        "designation": "Team Lead",
        "count": 4300
    },
    {
        "designation": "Trainee",
        "count": 4300
    },
    {
        "designation": "Architect",
        "count": 860
    },
    {
        "designation": "Human Resource Manager",
        "count": 860
    },
    {
        "designation": "Manager",
        "count": 860
    },
    {
        "designation": "Delivery Manager",
        "count": 86
    },
    {
        "designation": "Vice President",
        "count": 17
    },
    {
        "designation": "President",
        "count": 3
    }
]
```


[ApiCollection]: <https://github.com/farhantk/NoLimit-BE-Intern-2/blob/master/doc>














