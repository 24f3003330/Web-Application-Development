<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>Bookstore Catalog</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f9f9f9; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #444; padding: 8px; text-align: left; }
          th { background: #222; color: white; }
          tr:nth-child(even) { background: #eee; }
        </style>
      </head>
      <body>
        <h1>Bookstore Catalog</h1>
        <table>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Price</th>
            <th>ISBN</th>
          </tr>
          <xsl:for-each select="bookstore/book">
            <tr>
              <td><xsl:value-of select="title"/></td>
              <td><xsl:value-of select="genre"/></td>
              <td><xsl:value-of select="author/name"/></td>
              <td><xsl:value-of select="publish_date"/></td>
              <td><xsl:value-of select="price"/> <xsl:value-of select="price/@currency"/></td>
              <td><xsl:value-of select="isbn"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
