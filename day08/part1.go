package main

import (
    "fmt"
    "strings"
    "strconv"
    "io/ioutil"
)

type instruction struct {
    op string
    arg int
}

// const input =
// `nop +0
// acc +1
// jmp +4
// acc +3
// jmp -3
// acc -99
// acc +1
// jmp -4
// acc +6`


func main() {
    b, _ := ioutil.ReadFile("./input.txt")
    input := string(b)
    program := []instruction{}

    for _, line := range strings.Split(input, "\n") {
        s := strings.Split(line, " ")
        op := s[0];
        arg, _ := strconv.ParseInt(s[1], 0, 64);
        program = append(program, instruction{op, int(arg)})
    }

    ip := 0
    acc := 0
    previous := []int{}

    for true {
        for _, prev_ip := range previous {
            if prev_ip == ip {
            fmt.Println("Acc: ", acc)
            return;
            }
        }

        previous = append(previous, ip)
        ins := program[ip]

        if ins.op == "acc" {
            acc += ins.arg
            ip += 1;
        } else if ins.op == "jmp" {
            ip += ins.arg
        } else if ins.op == "nop" {
            ip += 1
        }
    }
}

