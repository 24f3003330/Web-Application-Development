package com.controller;

import java.io.*;        // ✅ FIX: [java.io](http://java.io).* → java.io.*
import java.sql.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {  // ✅ FIX: __CartServlet__ → CartServlet (underscores removed)

    String url = "jdbc:mysql://localhost:3306/shoppingdb";
    String user = "root";
    String pass = "root";

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        int total = 0;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(url, user, pass);

            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM cart");

            out.println("<html><head><title>Cart</title>");
            out.println("<style>");

            out.println("body{font-family:Arial;background:#f4f6f9;padding:20px;}");
            out.println("h2{text-align:center;}");
            out.println(".container{max-width:700px;margin:auto;background:white;padding:20px;border-radius:10px;box-shadow:0 0 10px #ccc;}");
            out.println(".item{display:flex;justify-content:space-between;padding:10px;border-bottom:1px solid #ddd;}");
            out.println(".item:last-child{border-bottom:none;}");
            out.println(".total{font-size:20px;font-weight:bold;text-align:right;margin-top:15px;}");
            out.println(".btn{display:inline-block;margin-top:20px;padding:10px 15px;background:#28a745;color:white;text-decoration:none;border-radius:5px;}");
            out.println(".btn2{background:#007bff;margin-left:10px;}");

            out.println("</style></head><body>");

            out.println("<div class='container'>");
            out.println("<h2>Your Cart</h2>");

            boolean hasItems = false;

            // ✅ FIX: [rs.next](http://rs.next)() → rs.next()
            while (rs.next()) {
                hasItems = true;
                String pname = rs.getString("pname");
                int price = rs.getInt("price");

                out.println("<div class='item'>");
                out.println("<span>" + pname + "</span>");
                out.println("<span>" + price + "/-</span>");
                out.println("</div>");

                total += price;
            }

            if (!hasItems) {
                out.println("<p style='text-align:center;'>Cart is empty 😔</p>");
            } else {
                out.println("<div class='total'>Total: " + total + "/-</div>");
            }

            out.println("<div style='text-align:center;'>");
            out.println("<a href='catalog.html' class='btn btn2'>Continue Shopping</a>");
            out.println("</div>");

            out.println("</div>");
            out.println("</body></html>");

            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
