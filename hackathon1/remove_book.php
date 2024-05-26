<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bookID = $_POST['book_id'];

    $sql = "DELETE FROM Books WHERE BookID = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $bookID);

    if ($stmt->execute()) {
        echo "Book removed successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>
