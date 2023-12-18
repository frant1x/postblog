<?php
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $data = file_get_contents("php://input");
        $postData = json_decode($data, true);
    
        $firstname = isset($postData['firstname']) ? $postData['firstname'] : '';
        $lastname = isset($postData['lastname']) ? $postData['lastname'] : '';
        $description = isset($postData['description']) ? $postData['description'] : '';
        $age = isset($postData['age']) ? $postData['age'] : '';
        $isHappy = isset($postData['isHappy']) ? $postData['isHappy'] : '';
        $show = isset($postData['show']) ? $postData['show'] : '';

        try {
            require_once "dbh.inc.php";
            if ($show == 1) {
                $query = "INSERT INTO users (firstname, lastname, description, age, isHappy) VALUES (:firstname, :lastname, :description, :age, :isHappy)";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(':firstname', $firstname, PDO::PARAM_STR);
                $stmt->bindParam(':lastname', $lastname, PDO::PARAM_STR);
                $stmt->bindParam(':description', $description, PDO::PARAM_STR);
                $stmt->bindParam(':age', $age, PDO::PARAM_INT);
                $stmt->bindParam(':isHappy', $isHappy, PDO::PARAM_BOOL);
                $stmt->execute();
            }
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