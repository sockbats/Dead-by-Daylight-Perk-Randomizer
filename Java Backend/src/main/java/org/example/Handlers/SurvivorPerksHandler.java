package org.example.Handlers;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


public class SurvivorPerksHandler extends BaseHandler {
    void post(JSONObject body) throws IOException {
        int perk_id = 0;
        try {
            perk_id = (int) body.get("perk_id");
            String name = (String) body.get("name");
            String description = (String) body.get("description");
            String icon = (String) body.get("icon");
            int survivor_id = (int) body.get("survivor_id");

            PreparedStatement statement = connection.prepareStatement("INSERT INTO survivor_perks VALUE (?, ?, ?, ?, ?)");
            statement.setInt(1, perk_id);
            statement.setString(2, name);
            statement.setString(3, description);
            statement.setString(4, icon);
            statement.setInt(5, survivor_id);
            int lines_affected = statement.executeUpdate();
            statement.close();

            send_http_response(201, json_message(lines_affected + " lines affected."));
        } catch (SQLException e) {
            if (e.getMessage().startsWith("Duplicate entry")) { // SQL error: duplicate primary key
                send_http_response(400, json_message("perk_id " + perk_id + " already exists!"));
            } else {
                System.out.println("SQL Error: " + e);
                send_http_response(500, json_message("SQL Error: " + e));
                throw new RuntimeException(e);
            }
        } catch (JSONException e) { // 400 Bad Request: Request body missing element
            var missing_element = e.getMessage().split("\"")[1];
            send_http_response(400, json_message("Request element '" + missing_element + "' not found!"));
        } catch (ClassCastException e) {
            send_http_response(400, json_message("perk_id must be int!"));
        } finally {
            try {
                connection.close();
            } catch (Exception _) {
            }
        }
    }

    void get_by_id(int id) throws IOException {
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT survivor_perks.*, survivors.name AS survivor_name FROM survivor_perks, survivors WHERE perk_id = ? AND survivors.survivor_id = survivor_perks.survivor_id");
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                JSONObject get_result = new JSONObject();
                get_result.put("perk_id", resultSet.getInt("perk_id"));
                get_result.put("name", resultSet.getString("name"));
                get_result.put("description", resultSet.getString("description"));
                get_result.put("icon", resultSet.getString("icon"));
                get_result.put("survivor_id", resultSet.getInt("survivor_id"));
                get_result.put("survivor_name", resultSet.getString("survivor_name"));
                send_http_response(200, get_result.toString());
            } else {
                send_http_response(404, json_message("perk_id " + id + " not found!"));
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
            String query = "SELECT survivor_perks.*, survivors.name AS survivor_name FROM survivor_perks, survivors WHERE survivors.survivor_id = survivor_perks.survivor_id ORDER BY survivor_perks.perk_id";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            ArrayList<JSONObject> perk_list = new ArrayList<>();
            while (resultSet.next()) {
                JSONObject get_result = new JSONObject();
                get_result.put("perk_id", resultSet.getInt("perk_id"));
                get_result.put("name", resultSet.getString("name"));
                get_result.put("description", resultSet.getString("description"));
                get_result.put("icon", resultSet.getString("icon"));
                get_result.put("survivor_id", resultSet.getInt("survivor_id"));
                get_result.put("survivor_name", resultSet.getString("survivor_name"));
                perk_list.add(get_result);
            }
            send_http_response(200, perk_list.toString());
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
            String description = (String) body.get("description");
            String icon = (String) body.get("icon");
            int survivor_id = (int) body.get("survivor_id");

            PreparedStatement statement = connection.prepareStatement("UPDATE survivor_perks SET name=?, description=?, icon=?, survivor_id=? where perk_id = ?");
            statement.setString(1, name);
            statement.setString(2, description);
            statement.setString(3, icon);
            statement.setInt(4, survivor_id);
            statement.setInt(5, id);
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
            PreparedStatement statement = connection.prepareStatement("DELETE FROM survivor_perks WHERE perk_id = ?");
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
            String query = "TRUNCATE survivor_perks";
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
