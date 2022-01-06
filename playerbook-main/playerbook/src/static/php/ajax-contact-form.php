<?php
/**
 * Class Ajax_Contact_Form
 *
 * Class to send emails using ajax
 *
 * @author:    nK <https://nkdev.info>
 * @link       https://github.com/nk-o/ajax-contact-form
 * @version    1.0.0
 * @license    MIT License
 */
class Ajax_Contact_Form {
    /**
     * Message destination email.
     *
     * @var string
     */
    protected $address_destination = 'lancamento@playerbook.com';

    /**
     * Message subject
     *
     * @var string
     */
    protected $message_subject = 'Mensagem de Interessado!';

    /**
     * Strings to translate or change it.
     *
     * @var array
     */
    protected $strings = array(
        'body'              => '
            <h1>{{subject}}</h1>
            <p><strong>From:</strong> {{name}}</p>
            <p><strong>E-Mail:</strong> {{email}}</p>
            <p><strong>Message:</strong> <br> {{message}}</p>',
        'success'           => 'Obrigado! Nós entraremos em contato.',
        'error'             => 'Houve um erro ao enviar a mensagem. Verifique as configurações do PHP.',
        'demo'              => 'Mensagem de Demonstração',
        'header_injection'  => 'Injeção de Cabeçalho detectada.',
        'enter_name'        => 'Inclua seu nome.',
        'enter_email'       => 'Inclua um endereço válido.',
        'enter_message'     => 'Inclua uma mensagem.',
        'ajax_only'         => 'Apenas XMLHttpRequest.',
    );

    /**
     * Demo mode, will return always success and demo message without email send.
     *
     * @var bool
     */
    protected $demo = false;

    /**
     * nK_Contact_Form constructor.
     */
    public function __construct() {
        // Demo message.
        if ( $this->demo ) {
            $this->successHandler('demo');
        }

        // Ajax check.
        if ( ! isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) || 'XMLHttpRequest' !== $_SERVER['HTTP_X_REQUESTED_WITH'] ) {
            $this->errorHandler('ajax_only');
        }

        // Get post data.
        $name    = stripslashes(trim($_POST['name']));
        $email   = stripslashes(trim($_POST['email']));
        $message = stripslashes(trim($_POST['message']));

        // Sanitize fields.
        $name = filter_var($name, FILTER_SANITIZE_STRING);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $message = filter_var($message, FILTER_SANITIZE_STRING);
        $message = nl2br($message, false); // false gives <br>, true gives <br />

        // Check header injection.
        $pattern = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';
        if ( preg_match($pattern, $name) || preg_match($pattern, $email) ) {
            $this->errorHandler('header_injection');
        }

        // Validate email.
        $isEmailValid = filter_var($email, FILTER_VALIDATE_EMAIL);

        // Check if name has been entered.
        if ( ! $name ) {
            $this->errorHandler('enter_name');
        }

        // Check if email has been entered and is valid.
        if ( ! $isEmailValid || ! $email ) {
            $this->errorHandler('enter_email');
        }

        // Check if message has been entered.
        if ( ! $message ) {
            $this->errorHandler('enter_message');
        }

        // Prepare headers.
        $headers  = 'MIME-Version: 1.1' . PHP_EOL;
        $headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
        $headers .= "From: $name <$email>" . PHP_EOL;
        $headers .= "Return-Path: $this->address_destination" . PHP_EOL;
        $headers .= "Reply-To: $email" . PHP_EOL;
        $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;

        // Prepare body.
        $body = $this->getString('body');
        $body = $this->template( $body, array(
            'subject' => $this->message_subject,
            'name'    => $name,
            'email'   => $email,
            'message' => $message,
        ) );
        $body = "
        <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
        <html>
            <head>
                <title>{$this->message_subject}</title>
                <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />
                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>
            </head>
            <body>{$body}</body>
        </html>";

        // If there is no error, send the email.
        $result = @mail($this->address_destination, $this->message_subject, $body, $headers);
        if ( $result ) {
            $this->successHandler('success');
        } else {
            $this->errorHandler('error');
        }
    }

    /**
     * Template string.
     *
     * @param $string
     * @param $vars
     *
     * @return string
     */
    public function template($string, $vars) {
        foreach ( $vars as $name => $val ) {
            $string = str_replace("{{{$name}}}", $val, $string);
        }
        return $string;
    }

    /**
     * Get string from $string variable.
     *
     * @param $string
     *
     * @return string
     */
    public function getString($string) {
        return isset( $this->strings[$string] ) ? $this->strings[$string] : $string;
    }

    /**
     * Error result.
     *
     * @param $message
     */
    public function errorHandler($message) {
        die(json_encode(array(
            'type'     => 'error',
            'response' => $this->getString($message),
        )));
    }

    /**
     * Success result.
     *
     * @param $message
     */
    public function successHandler($message) {
        die(json_encode(array(
            'type'     => 'success',
            'response' => $this->getString($message),
        )));
    }
}
new Ajax_Contact_Form();
