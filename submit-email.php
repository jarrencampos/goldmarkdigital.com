<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Get email from POST
    $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);

    if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email";
        exit;
    }

    // CHANGE THIS TO YOUR EMAIL
    $to = "hello@goldmarkdigital.com";
    $subject = "New Website Inquiry";
    $message = "New contact email submitted:\n\n$email";
    $headers = "From: noreply@goldmarkdigital.com";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "OK";
    } else {
        http_response_code(500);
        echo "Mail failed";
    }
}
?>