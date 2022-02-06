<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Expcetion.php'
    require 'phpmailer/src/PHPMailer.php'

    $mail = new PHPMailer(true)
    $mail->CharSet = 'UTF-8'
    $mail->setLanguage('ru','phpmailer/language/')
    $mail->IsHTML(true)

    $mail->setFrom('a.vidiborets@gmail.com','Андрей')

    $mail->addAddress('a.vidiborets@gmail.com')

    $mail->Subject = 'Привет ,у вас новая вакансия'

    $body = '<h1>Содержание письма</h1>'

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong>'.$_POST['name'].'</p>'
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Email:</strong>'.$_POST['email'].'</p>'
    }
    if(trim(!empty($_POST['phone']))){
        $body.='<p><strong>Phone:</strong>'.$_POST['phone'].'</p>'
    }
    if(trim(!empty($_POST['subject']))){
        $body.='<p><strong>Subject:</strong>'.$_POST['subject'].'</p>'
    }
    if(trim(!empty($_POST['text']))){
        $body.='<p><strong>Text:</strong>'.$_POST['text'].'</p>'
    }
    if(trim(!empty($_POST['text']))){
        $body.='<p><strong>Text:</strong>'.$_POST['text'].'</p>'
    }

    if(!empty($_FILES['image']['tmp_name'])){
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name']

        if(copy($_FILES['image']['tmp_name'],$filePath)){
            $fileAttach = $filePath;
            $body.='<p><striong>Фото в приложении</strong></p>';
            $mail->addAttachment($fileAttach)
        }
    }

    $mail->Body = $body

    if(!$mail->send()){
        $message = 'Ошибка'
    }else{
        $message = 'Данные отправлены'
    }

    $response = ['message'=>$message]

    header('Content-type:application/json')
    echo json_encode($response)
    
    ?>

