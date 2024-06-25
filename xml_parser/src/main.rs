extern crate quick_xml;
extern crate serde_xml_rs;
extern crate serde_json;

use std::io::{BufRead, BufReader, Read};
use std::fs::File;
use quick_xml::{Reader, Writer, events::Event, events::BytesStart};
//use serde::de::Deserializer;
//#[derive(Debug)]
// struct Document {
//     username: String,
//     password: String,
// }

pub fn main() {
    let contents:std::string::String;
    contents = match read_from_file() {
      Ok(s) => s,
      Err(_) => "Cannot open contents of file".to_owned(),
    };
    let mut reader = Reader::from_str(&contents);
    
    
    let mut buf = Vec::new();
    let mut junk_buf: Vec<u8> = Vec::new();
    let mut count = 0;
    //let mut stats = HashMap::new();
    //let mut results = "";
    // streaming code
    loop {
      match reader.read_event_into(&mut buf) {
        Err(e) => panic!(
          "Error at position {}: {:?}",
          reader.buffer_position(),
          e
        ),
        Ok(Event::Eof) => break,
        Ok(Event::Start(e)) => {
          match e.name().as_ref() {
            b"PO" => {
              // load entire tag into buffer
              let document_bytes = read_to_end_into_buffer(
                &mut reader,
                &e,
                &mut junk_buf
              ).unwrap();
              let str = std::str::from_utf8(&document_bytes)
                .unwrap();
              println!("Here is the document: ");
              println!("{str}");
              // deserialize from buffer
              //let mut deserializer = serde_xml_rs::Deserializer::new_from_reader(str.as_bytes()).non_contiguous_seq_elements(true);deserializer.deserialize_u8(str);
              // "business" "logic"
              //process_document(&document, &mut stats);
              count += 1;
              if count % 1_000_000 == 0 {
                println!("checked {} records", count);
              }
            }
            _ => (),
          }
        }
        // Other Events are not important for us
        _ => (),
      }
      // clear buffer to prevent memory leak
      buf.clear();
    }
    //todo_print_results(&stats);
    // for (key, value) in &stats {
    //   println!("{}: {}", key, value);
    // }
  
    //return Result::Ok("Success");
}

fn read_from_file() -> std::io::Result<String>{
  println!("./document.xml");
  let file = File::open("/Users/mitchwilde/projects-local/MERN-tutorial/jam-app/xml_parser/src/document.xml")?;
  let mut buf_reader = BufReader::new(file);
  let mut contents = String::new();
  buf_reader.read_to_string(&mut contents)?;
  //println!("{contents}");
  Ok(contents)
}

// reads from a start tag all the way to the corresponding end tag,
// returns the bytes of the whole tag
fn read_to_end_into_buffer<R: BufRead>(
    reader: &mut Reader<R>,
    start_tag: &BytesStart,
    junk_buf: &mut Vec<u8>,
  ) -> Result<Vec<u8>, quick_xml::Error> {
    let mut depth = 0;
    let mut output_buf: Vec<u8> = Vec::new();
    let mut w = Writer::new(&mut output_buf);
    let tag_name = start_tag.name();
    w.write_event(Event::Start(start_tag.clone()))?;
    loop {
        junk_buf.clear();
        let event = reader.read_event_into(junk_buf)?;
        w.write_event(&event)?;
  
        match event {
            Event::Start(e) if e.name() == tag_name => depth += 1,
            Event::End(e) if e.name() == tag_name => {
                if depth == 0 {
                    return Ok(output_buf);
                }
                depth -= 1;
            }
            Event::Eof => {
                panic!("oh no")
            }
            _ => {}
        }
    }
  }

  // fn read_from_db() -> std::io::Result<String>{
  //   use postgres::{Client, NoTls};
  //   let mut client = Client::connect("host=localhost user=postgres", NoTls)?;
  //   let baz = true;
  //   for row in client.query("SELECT foo FROM bar WHERE baz = $1", &[&baz])? {
  //       let foo: i32 = row.get("foo");
  //       println!("foo: {}", foo);
  //   }
  // }
  