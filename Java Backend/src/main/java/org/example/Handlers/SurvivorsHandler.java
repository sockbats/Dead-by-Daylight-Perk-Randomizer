package org.example.Handlers;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


public class SurvivorsHandler extends BaseHandler {
    void post(JSONObject body) throws IOException {
        int survivor_id = 0;
        try {
            survivor_id = (int) body.get("survivor_id");
            String name = (String) body.get("name");
            String image = (String) body.get("image");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO survivors VALUE (?, ?, ?)");
            statement.setInt(1, survivor_id);
            statement.setString(2, name);
            statement.setString(3, image);
            int lines_affected = statement.executeUpdate();
            statement.close();

            send_http_response(201, json_message(lines_affected + " lines affected."));
        } catch (SQLException e) {
            if (e.getMessage().startsWith("Duplicate entry")) { // SQL error: duplicate primary key
                send_http_response(400, json_message("survivor_id " + survivor_id + " already exists!"));
            } else {
                System.out.println("SQL Error: " + e);
                send_http_response(500, json_message("SQL Error: " + e));
                throw new RuntimeException(e);
            }
        } catch (JSONException e) { // 400 Bad Request: Request body missing element
            var missing_element = e.getMessage().split("\"")[1];
            send_http_response(400, json_message("Request element '" + missing_element + "' not found!"));
        } catch (ClassCastException e) {
            send_http_response(400, json_message("survivor_id must be int!"));
        } finally {
            try {
                connection.close();
            } catch (Exception _) {
            }
        }
    }

    void get_by_id(int id) throws IOException {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT * FROM survivors WHERE survivor_id = ?");
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                JSONObject get_result = new JSONObject();
                get_result.put("survivor_id", resultSet.getInt("survivor_id"));
                get_result.put("name", resultSet.getString("name"));
                get_result.put("image", resultSet.getString("image"));
                send_http_response(200, get_result.toString());
            } else {
                send_http_response(404, json_message("survivor_id " + id + " not found!"));
            }
            statement.close();
            resultSet.close();
        } catch (SQLException e) {
            System.out.println("SQL Exception: " + e);
            send_http_response(500, json_message(e.toString()));
        } finally {
            try {
                connection.close();
            } catch (SQLException _) {
            }
        }
    }

    void get_all() throws IOException {
        try {
            String query = "SELECT * FROM survivors";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            ArrayList<JSONObject> survivor_list = new ArrayList<>();
            while (resultSet.next()) {
                JSONObject get_result = new JSONObject();
                get_result.put("survivor_id", resultSet.getInt("survivor_id"));
                get_result.put("name", resultSet.getString("name"));
                get_result.put("image", resultSet.getString("image"));
                survivor_list.add(get_result);
            }
            send_http_response(200, survivor_list.toString());
            statement.close();
            resultSet.close();
        } catch (SQLException e) {
            System.out.println("SQL Exception: " + e);
            send_http_response(500, json_message("SQL Exception: " + e));
        } finally {
            try {
                connection.close();
            } catch (SQLException _) {
            }
        }
    }

    void put(int id, JSONObject body) throws IOException {
        try {
            String name = (String) body.get("name");
            String image = (String) body.get("image");

            PreparedStatement statement = connection.prepareStatement("UPDATE survivors SET name=?, image=? where survivor_id = ?");
            statement.setString(1, name);
            statement.setString(2, image);
            statement.setInt(3, id);
            int lines_affected = statement.executeUpdate();
            statement.close();

            send_http_response(200, json_message(lines_affected + " lines affected."));
        } catch (SQLException e) {
            System.out.println("SQL Error: " + e);
            send_http_response(500, json_message("SQL Error: " + e));
            throw new RuntimeException(e);
        } catch (JSONException e) { // 400 Bad Request: Request body missing element
            var missing_element = e.getMessage().split("\"")[1];
            send_http_response(400, json_message("Request element '" + missing_element + "' not found!"));
        } finally {
            try {
                connection.close();
            } catch (SQLException _) {
            }
        }
    }

    void delete_by_id(int id) throws IOException {
        try {
            PreparedStatement statement = connection.prepareStatement("DELETE FROM survivors WHERE survivor_id = ?");
            statement.setInt(1, id);
            int lines_affected = statement.executeUpdate();
            statement.close();

            send_http_response(200, json_message(lines_affected + " lines deleted."));
        } catch (SQLException e) {
            System.out.println("SQL Error: " + e);
            send_http_response(500, json_message("SQL Error: " + e));
            throw new RuntimeException(e);
        } finally {
            try {
                connection.close();
            } catch (SQLException _) {
            }
        }
    }

    void delete_all() throws IOException {
        try {
            String query = "TRUNCATE survivors";
            Statement statement = connection.createStatement();
            int lines_affected = statement.executeUpdate(query);
            statement.close();

            send_http_response(200, json_message(lines_affected + " lines deleted."));
        } catch (SQLException e) {
            System.out.println("SQL Error: " + e);
            send_http_response(500, json_message("SQL Error: " + e));
            throw new RuntimeException(e);
        } finally {
            try {
                connection.close();
            } catch (SQLException _) {
            }
        }
    }
}
