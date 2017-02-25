<h2>D3 Charts Without Knowing D3.js</h2>
<p>
    Need a robust D3 chart for your site, but don't have the time or desire to learn D3.js?  This is a simple app that lets you design your own chart in the browser, then gives you the code to paste into your web page.  And the beauty of the chart being entirely in D3 is that you have the option of updating or expanding it later using D3.js if you wish. 
</p>
<h4>Why D3.js?</h4>
<p>
    The main reason is that D3.js the most powerful data visualization language out there, and it works on the web, right in the browser.  It has become the de facto standard for data visualization.  One hundred percent JavaScript, D3 works with existing web technologies of the client side stack - HTML, CSS, JavaScript and SVG.  Nothing server side required, no additional frameworks or plugins.
</p>
<h4>Getting Started</h4>
<p>
    The first thing you need is data.  If you look at the editor the first field already contains some very simple data, the frequency of letters appearing in the English language.  You can use the default data, but keep in mind that different styles can look different with varying data.  For example, on the default x-axis the tick labels are single letters.  They fit just fine horizontally.  But imagine if those labels were long words.  They would overlap each other which would be aesthetically unpleasing.  In that case you would want to rotate the x-axis labels, 45 or 90 degrees, depending on which looks best in your case. 
</p>
<p>
    If possible, you should use a sample of your data for the best results. You can paste your data into this field if you have it, but it must be in tab separated format (.TSV).  Just make sure it is properly formatted TSV, and there are no blanks lines, including the last line.  
    <blockquote>This is not a requirement when you have the final code on your website.  You can read the data from a TSV, CSV or JSON file, or use any SOAP or REST web service you want to provide the chart JSON data to use.  Again, existing web technologies. :-)</blockquote>
</p>
<p>
    After you have the data formatted in the text field, scroll down the page and begin editing the various features of the chart.  Click the red <span class="glyphicon glyphicon-question-sign howto" data-toggle="collapse" data-target="#paddinginfo"></span> icon for more information about each section. </p>
<p>
    D3 charts utilize SVG's.  If you are already familiar with SVG, you will know that styling can be very different than HTML, and regular CSS does not always apply.  The features listed in the editor are ones that cannot realistically (at least easily) be styled with CSS.  Other features, such as the text attributes, color of the bars and features of the axes can be styled with normal CSS.  
    <blockquote>The most important thing to remember about styling is that colors of SVG elements do not use the 'color' attribute, but 'fill' instead. </blockquote>
</p>
<p>
    Go through the fields and change the attributes to get the look you want.  Just click the "Update" button to see the changes on the chart to the left.  
</p>
<h4>The Fun Part</h4>
<p>
    Once you have the chart looking the way you want it, its time to get your customized code.  Scroll down to the end of the editor, and click the "Get the Code" button.  The code will be displayed in the text field.  This code is a complete HTML document.  Just copy and paste the code into a file in your editor, and save it as HTML.  
</p>
<p>
    By default, the code looks for a "data.tsv" file in the same directory.  Create this file with the tab separated data in it (copy it from the editor if you done have real data yet).  Open the HTML file in your browser and boom - there is your chart.  <blockquote>In the comments are instructions for changing the code to use a CSV or JSON file.  It also contains instruction about how to use external JSON data to create and update the chart.</blockquote>
</p>
<p>
    The code can be broken up and put into your own pages, and it is well documented to explain how to do that.  Just put the CSS in your style sheet, the 3 line block of HTML in your web page, and the JavaScript in your .js document. <blockquote>The HTML has a "chart-container" div that contains the SVG chart. This element <em>must</em> have a set width and height.  The SVG chart will automatically size itself to fill the container.  Without a set size, the chart will not display correctly.</blockquote>
</p>
