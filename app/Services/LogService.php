<?php

namespace App\Services;

use Monolog\Handler\StreamHandler;
use Monolog\Level;
use Monolog\Logger;

class LogService
{
    protected $logger;

    public function __construct()
    {
        $this->logger = new Logger('Library_book_registry');
        $this->logger->pushHandler(
            new StreamHandler(storage_path('logs/books.log'), Level::Debug)
        );
    }

    public function info(string $message, array $context = [])
    {
        $this->logger->info($message, $context);
    }

    public function warning(string $message, array $context = [])
    {
        $this->logger->warning($message, $context);
    }

    public function error(string $message, array $context = [])
    {
        $this->logger->error($message, $context);
    }
}
