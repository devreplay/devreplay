<?php

function fizzbuzz($i, $max = 100)
{
    if ($i % 15 === 0) {
        echo 'FizzBuzz', PHP_EOL;
    } elseif ($i % 3 === 0) {
        echo 'Fizz', PHP_EOL;
    } elseif ($i % 5 === 0) {
        echo 'Buzz', PHP_EOL;
    } else {
        echo $i, PHP_EOL;
    }

    if ($i < $max) {
        fizzbuzz($i + 1, $max);
    }
}

fizzbuzz(1);