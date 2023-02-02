# Getting Started with very simple table lib

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install

In your project directory type the following commande
 npm install very-simple-table-lib

### Features
<dl>
<dd>Easy to use</dd>
<dd>Number of entries per page</dd>
<dd>Sorting</dd>
<dd>Search field</dd>
<dd>Jump page</dd>
</dl>

### How to use

import Table from 'very-simple-table-lib/dist/components/Table'

then you need to pass data in JSON format and an object containing what data to display and the corresponding thead in this fashion
~~~
const yourJSON = {people:[
    {
        "firstName": "me",
        "lastName": "you",
        "dateOfBirth": "tommorow",
        "country": "international waters"
    },
    ....
]}
~~~
now you choose what data you want to display on the table and in what order
~~~
const keys = {country: "Country column", firstName: "First name column"}

return <Table data={yourJSON} keys={dataToShow}/>
~~~

output:

| Country column   |   First name column  |
|    ---------     |     ---------------  |
| international waters    |          me          |
|    ...           |         ...          |




### Github
Code available at [Github](https://github.com/MosMid/very-simple-table-lib)