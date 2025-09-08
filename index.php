<?php
require __DIR__ . '/.env';


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, XRequested-With");


$servername = "localhost";
$username = "root";
$password = getenv('PASSWORD');

$request = $_SERVER['REQUEST_METHOD'];

// Create an if statement to check if this is a GET request

$conn = new PDO("mysql:host=$servername;dbname=gruppe1_pipper", $username, $password);
// set the PDO error mode to exception
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// echo $uri;

// $uri = explode('/', $uri);


if ($request === 'GET' && $uri === '/pips') {
    try {
        $statement = $conn->query("SELECT * FROM pips ORDER BY post_date DESC");
        $result = $statement->fetchAll();

        echo json_encode($result);
    } catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    }
} 
else if ($request === 'POST' && $uri === '/pips') {
    $input = (array) json_decode(file_get_contents('php://input'), true);

    $name = $input["user_name"];
    $msg = $input["post_message"];
    $length = strlen($name);
//forbinder længden af user-name med variablen $length 
//kan anvendes til validering fx hvis navnet højest må være 50 tegn


    if ($name !== '') { // validering: overholde regler for at gemme korrekt data
        $data = [
            'user_name' => $name,
            'post_message' => $msg
        ];
        $sql = "INSERT INTO pips VALUES (default, :user_name, NOW(), :post_message)";
   
        $stmt= $conn->prepare($sql);
        $stmt->execute($data);


        $id = $conn->lastInsertId();
        $pip = (object) $input;
        $pip->id = $id;

     echo json_encode($pip);
    } else {
        echo json_encode("Navn skal udfyldes");
    }

    // echo $name;
    

}

//startup kommando php -S 127.0.0.1:8000 -t backend

?>
