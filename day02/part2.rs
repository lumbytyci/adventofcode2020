fn main() {
    let input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
    let mut valid_count = 0;

    for line in &input {
        let line = line.split(" ").collect::<Vec<&str>>();
        if let [r, chr, p] = &line[..] {
            let chr = chr.chars().next().unwrap();
            let ranges = r.split("-").collect::<Vec<&str>>();
            let start_r: usize = ranges[0].parse().unwrap();
            let end_r: usize = ranges[1].parse().unwrap();

            let num_occurr = countOccurrences(&p, chr);

            if  (p.chars().nth(start_r - 1).unwrap() != chr)
                    ^ (p.chars().nth(end_r - 1).unwrap() != chr) {
                valid_count += 1;
            }
        }
    }

    println!("Answer: {}", valid_count);
}

fn countOccurrences(input: &str, c: char) -> i32 {
    let mut n = 0;

    for chr in input.chars() {
        if chr == c {
            n += 1;
        }
    }

    return n;
}
