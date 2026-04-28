package com.controller;

import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/controller")
public class MainController extends HttpServlet {

    String url = "jdbc:mysql://localhost:3306/shoppingdb";
    String user = "root";
    String pass = "root"; // change if needed

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter(); // ✅ FIX: single getWriter() call reused throughout

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(url, user, pass);

            // ================= REGISTER =================
            if (action.equals("register")) {

                String uname = request.getParameter("username");
                String pwd = request.getParameter("password");

                PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO users(username,password) VALUES (?,?)");

                ps.setString(1, uname);
                ps.setString(2, pwd);
                ps.executeUpdate();

                // ✅ FIX: removed duplicate `PrintWriter out1 = response.getWriter()` — reuse `out`
                out.println(
                "<html><head><title>Register Success</title>" +
                "<style>body{font-family:Arial;background:linear-gradient(135deg,#ff9a9e,#fad0c4);text-align:center;padding-top:100px;} .box{background:white;padding:40px;border-radius:12px;display:inline-block;} a{display:inline-block;margin-top:20px;padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:6px;}</style></head><body>" +
                "<div class='box'>" +
                "<h2>Registration Successful</h2>" +
                "<a href='login.html'>Goto Login</a>" +
                "</div></body></html>"
                );
            }

            // ================= LOGIN =================
            else if (action.equals("login")) {

                String uname = request.getParameter("username");
                String pwd = request.getParameter("password");

                PreparedStatement ps = con.prepareStatement(
                        "SELECT * FROM users WHERE username=? AND password=?");

                ps.setString(1, uname);
                ps.setString(2, pwd);

                ResultSet rs = ps.executeQuery();

                if (rs.next()) {
                    // ✅ FIX: removed duplicate `PrintWriter out1 = response.getWriter()` — reuse `out`
                    out.println(
                    "<html><head><title>Login Success</title>" +
                    "<style>body{font-family:Arial;background:linear-gradient(135deg,#74ebd5,#ACB6E5);text-align:center;padding-top:100px;} .box{background:white;padding:40px;border-radius:12px;display:inline-block;} a{display:inline-block;margin-top:20px;padding:10px 20px;background:#28a745;color:white;text-decoration:none;border-radius:6px;}</style></head><body>" +
                    "<div class='box'>" +
                    "<h2>Login Successful</h2>" +
                    "<a href='catalog.html'>Go to Products</a>" +
                    "</div></body></html>"
                    );
                } else {
                    out.println("<h3 style='color:red;'>Invalid Login ❌</h3>");
                    out.println("<a href='login.html'>Try Again</a>");
                }
            }

            // ================= ADD TO CART =================
            else if (action.equals("addcart")) {

                String pname = request.getParameter("pname");
                int price = Integer.parseInt(request.getParameter("price"));

                PreparedStatement ps = con.prepareStatement(
                        "INSERT INTO cart(pname,price) VALUES (?,?)");

                ps.setString(1, pname);
                ps.setInt(2, price);
                ps.executeUpdate();

                // ✅ FIX: removed duplicate `PrintWriter out1 = response.getWriter()` — reuse `out`
                out.println(
                "<html><head><title>Added</title>" +
                "<style>body{font-family:Arial;background:linear-gradient(135deg,#84fab0,#8fd3f4);text-align:center;padding-top:100px;} .box{background:white;padding:40px;border-radius:12px;display:inline-block;} a{display:inline-block;margin:10px;padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:6px;}</style></head><body>" +
                "<div class='box'>" +
                "<h2>Item Added Successfully</h2>" +
                "<a href='catalog.html'>Back to Products</a>" +
                "<a href='cart'>View Cart</a>" +
                "</div></body></html>"
                );
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
            out.println("<h3 style='color:red;'>Error: " + e.getMessage() + "</h3>");
        }
    }
}
