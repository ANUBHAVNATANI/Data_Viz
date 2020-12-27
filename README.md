## IVIZ Project Report

URL -- https://schoolviz.netlify.app/

**Problem statement**

State of schools in different states and Union Territories of India.

We have done an exploratory analysis of the data of basic facilities and parameters of quality education in schools in different states and union territories of India and analyzed how these factors affect the **literacy rate and gross enrollment of students**.

The factors we look considered for schools of different States and Union Territories are -

1. Budget allocated to education.
1. Availability of trained teachers.
1. Drop out rate of students from schools.
1. Availability of electricity and drinking water.
1. Availability of toilets for girls and boys.
1. Availability of computers.

We have made 4 different kinds of visualizations for each available combination of data** and have provided a selector to select the state and a factor to focus on a particular visualization.


**Visualization**

Now we will look at each of the visualizations and discuss the reason for selecting as well as strengths and weaknesses of each one of them.

1. **Coloured map**

We have used this visualization to inform viewers about the raw data over years. We have made this 

Chart interactive such that when the viewer hovers over the state he/she will see the values of chosen parameters for different years.

**Strengths -** 

1. This is used to get an idea of raw information for different states, as looking at the raw information with the help of a bar chart or any other chart can be a bit cluttered as there are many states and union territories (which are in total more than 35 categories) and it would be hard for viewer to keep track of this information.
1. The map makes it easier to visualize how the information is distributed geographically.

**Weakness-**

1. Since states are categorical data, we had to give each one a different color to fill the states. It  would make that a bit difficult for viewers to differentiate between so many hues.

1. **Choropleth Map**
   We have used this map to let viewers differentiate between the values of a particular parameter for different states. We have also made the chart interactive as when a viewer hovers over the state he/she can see the values associated with that particular state.

**Strengths -** 

1. Choropleth maps are very helpful in visualizing information when we want the viewer to see the difference between the values of different geographical regions. 
1. This map helps us see differences between different states and we can see the lowest and highest easily.

`	`**Weakness -**

1. Some states and union territories with higher values can appear the same color on the choropleth maps.

But we have made the chart interactive to overcome this problem.

`     `**3.  Line chart**

We plot the progression of different factors for each state over the years using the x axis as the time scale and y as the value scale. Grids have also been made to help viewers figure out the information from the chart easily.

**Strengths -**

1. This chart helps viewers to see the progression of values over the years.
1. Grids in charts help viewers to look at the accurate values of the parameters over the years.

**Weakness -**

1. Line charts do not handle null values and outliers very well.

`    `**4. Diverging bar chart** 

We have used this visualization to inform the viewer about the percentage change of a factor over the years, this helps in looking at the performance of different states and see which states and union territories are doing better or worse over the years.




**Strengths -** 

1. By coloring negative percentage change values with red(on the left side) and positive values with blue(on the right side) helps the viewer see and judge the percentages of changes as well as see which ones are worse and which are best.

**Weakness -** 

1. Visualizing so many values using a bar chart can be a bit cluttered.

So we have made the bar chart horizontal and used different colors to make information easier to understand.









**Please scroll down for Insights** 


























**Insights from visualizations**

![](IVIZ%20Project.001.png)![](IVIZ%20Project.002.png)

As we can see from the above visualization, Uttar Pradesh & Daman and Diu have seen the most increase over the years in terms of dropout rates whereas Bihar, Nagaland and Telangana have made significant improvement.

![](IVIZ%20Project.003.png)![](IVIZ%20Project.001.png)

As we can see from the above visualization all states have made improvements in terms of electricity in schools but Bihar and West Bengal have made significant improvement. Which has reflected in their gross enrollment ratio.

![](IVIZ%20Project.004.png)![](IVIZ%20Project.001.png)

As we can see from the above visualization, Uttar Pradesh & Daman and Diu have seen the most decline over the years in terms of gross enrollment whereas Bihar, Meghalaya and West Bengal made significant improvement. This also confirms that higher dropout rates have a direct impact on the gross enrollment ratio. Also other factors like electricity, availability of drinking water etc. also played a key role in improving literacy and gross enrolment ratio.

![](IVIZ%20Project.005.png)

![](IVIZ%20Project.006.png)

Viewers can get the raw information over the years from the above visualization. This shows that the percentage of schools equipped with computers is improving over the years in Bihar.


![](IVIZ%20Project.007.png)![](IVIZ%20Project.008.png)

From this visualization we can see the choropleth map for literacy of each state we can see that Uttar pradesh has very less literacy rate and we can also relate it to the other factors previously discussed about Uttar Pradesh.

![](IVIZ%20Project.009.png)

From the visualization we can see the increase of the dropout rates over the years in uttar pradesh, and it coincides with our other conclusions stated above.

![](IVIZ%20Project.010.png)

Here is the same visualization for Bihar. We can see that there is a decrease in the dropout rate in Bihar which can be related to the results stated above.




**References** 

Visualisations:

<https://datavizcatalogue.com/methods/choropleth.html>

<https://www.coursera.org/specializations/information-visualization>

<https://devdocs.io/d3~4/>

<https://github.com/d3/d3/wiki/Gallery>

Data source:

<https://data.gov.in/resources/percentage-schools-drinking-water-facility-2013-14-2015-16>

<https://data.gov.in/resources/gross-enrolment-ratio-2013-14-2015-16>

<https://data.gov.in/resources/drop-out-rate-2012-13-2014-15>

<https://data.gov.in/resources/percentage-schools-computers-2013-14-2015-16>

<https://data.gov.in/resources/percentage-schools-electricity-2013-14-2015-16>

<https://data.gov.in/resources/schools-boys-toilet-2013-14-2015-16>

<https://data.gov.in/resources/schools-girls-toilet-2013-14-2015-16>

<https://data.gov.in/resources/literacy-rate-persons-residence-2001-2011>

<https://data.gov.in/resources/percentage-trained-teachers-statistics-school-education-2010-11>

