import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';

// Define an interface for Artist
interface Artist {
  name: string;
  shortname: string;
  reknown: string;
  bio: string;
  highlight?: boolean; // Optional highlight property
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule], // Add FormsModule to imports array
  templateUrl: './app.component.html',
  styles: [
    `
      list-group-item:first-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: 0;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  query: string;
  artists: Artist[]; // Define 'artists' as an array of Artist objects

  // Define types for 'e' and 'item'
  showArtist(e: Event, item: Artist) {
    console.log(e);
    this.query = item.name; // Set 'query' to the artist's name when clicked
    item.highlight = !item.highlight; // Toggle highlight property
  }

  constructor(private http: HttpClient) {
    this.query = ''; // Initialize the 'query' property here
    this.artists = []; // Initialize the artists array
  }

  ngOnInit(): void {
    // Change Object to Artist[] to match the expected data type
    this.http.get<Artist[]>('../assets/data.json').subscribe(data => {
      this.artists = data; // Assign the fetched data to artists
    });
  }
}
