package org.example.Handlers;

import org.json.JSONObject;

import java.io.IOException;

public class InfoHandler extends BaseHandler {
    @Override
    void post(JSONObject body) throws IOException {
        send_http_response(405, json_message("POST not allowed!"));
    }

    @Override
    void get_by_id(int id) throws IOException {
        send_http_response(405, json_message("GET by ID not allowed!"));
    }

    @Override
    void get_all() throws IOException {
        JSONObject info = new JSONObject();
        info.put("backend_type", "Java");
        send_http_response(200, info.toString());
    }

    @Override
    void put(int id, JSONObject body) throws IOException {
        send_http_response(405, json_message("PUT not allowed!"));
    }

    @Override
    void delete_by_id(int id) throws IOException {
        send_http_response(405, json_message("DELETE by ID not allowed!"));
    }

    @Override
    void delete_all() throws IOException {
        send_http_response(405, json_message("DELETE all not allowed!"));
    }
}
