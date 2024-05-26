<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $bookID = $_POST['book_id'];

    // Here you can implement the logic to mark the book as sold or to notify an administrator for removal

    echo "Remove request sent successfully for Book ID: $bookID";
}
?>
