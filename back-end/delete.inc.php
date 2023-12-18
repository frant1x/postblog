<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = file_get_contents("php://input");
        $postData = json_decode($data, true);
        $id = isset($postData['id']) ? $postData['id'] : '';

        try {
            require_once "dbh.inc.php";
            $query = "DELETE FROM users WHERE id = :id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $query = "SELECT * FROM users";
            $statement = $pdo->query($query);
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);

            header('Content-Type: application/json');
            echo json_encode($data);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }

    } 
    else {
        echo "Invalid request method";
    }