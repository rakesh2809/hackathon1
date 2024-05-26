<?php
include 'db_connect.php';

$search_query = $_GET['query'];
$sql = "SELECT * FROM Books WHERE Title LIKE ? OR Author LIKE ? ORDER BY DateAdded DESC";
$search_param = "%" . $search_query . "%";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $search_param, $search_param);
$stmt->execute();
$result = $stmt->get_result();

$books = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
} 

echo json_encode($books);

$stmt->close();
$conn->close();
?>
