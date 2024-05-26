<?php
include 'db_connect.php';

$sql = "SELECT * FROM Books ORDER BY DateAdded DESC";
$result = $conn->query($sql);

$books = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
} 

echo json_encode($books);

$conn->close();
?>
