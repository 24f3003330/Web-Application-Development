package src;

import java.sql.*;
import java.util.Scanner;

class JDBC {

    // Database credentials
    static final String URL = "jdbc:mysql://localhost:3306/practice";
    static final String USER = "root";
    static final String PASS = "Mysql@31";

    // Get connection
    static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASS);
    }

    // CREATE
    static void insertEmployee(int id, int salary) {
        String sql = "INSERT INTO employee VALUES (?, ?)";
        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.setInt(2, salary);
            ps.executeUpdate();
            System.out.println("✅ Employee inserted");

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // READ
    static void getAllEmployees() {
        String sql = "SELECT * FROM employee";
        try (Connection con = getConnection();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            System.out.println("\n--- Employee List ---");
            while (rs.next()) {
                System.out.println(
                    "ID: " + rs.getInt(1) +
                    " Salary: " + rs.getInt(2)
                );
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // UPDATE
    static void updateSalary(int id, int newSalary) {
        String sql = "UPDATE employee SET salary = ? WHERE id = ?";
        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, newSalary);
            ps.setInt(2, id);
            int rows = ps.executeUpdate();

            if (rows > 0)
                System.out.println("✅ Salary updated");
            else
                System.out.println("❌ Employee not found");

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // DELETE
    static void deleteEmployee(int id) {
        String sql = "DELETE FROM employee WHERE id = ?";
        try (Connection con = getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            int rows = ps.executeUpdate();

            if (rows > 0)
                System.out.println("✅ Employee deleted");
            else
                System.out.println("❌ Employee not found");

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // MAIN MENU
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n1.Insert  2.View  3.Update  4.Delete  5.Exit");
            System.out.print("Choose: ");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter ID: ");
                    int id = sc.nextInt();
                    System.out.print("Enter Salary: ");
                    int sal = sc.nextInt();
                    insertEmployee(id, sal);
                    break;

                case 2:
                    getAllEmployees();
                    break;

                case 3:
                    System.out.print("Enter ID: ");
                    id = sc.nextInt();
                    System.out.print("Enter New Salary: ");
                    sal = sc.nextInt();
                    updateSalary(id, sal);
                    break;

                case 4:
                    System.out.print("Enter ID: ");
                    id = sc.nextInt();
                    deleteEmployee(id);
                    break;

                case 5:
                    System.out.println("👋 Exiting...");
                    sc.close();
                    return;

                default:
                    System.out.println("❌ Invalid choice");
            }
        }
    }
}
