import { Component, OnInit } from '@angular/core';
import { generate } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'learn-khmer';
  
  translateFrom: Mode
  translateTo: Mode

  fourRandomPhrases: [Phrase, Phrase, Phrase, Phrase]
  incorrectlySelected: [boolean, boolean, boolean, boolean]
  randomCorrectIndex: number

  choose(index: number): void {
    if (index === this.randomCorrectIndex) {
      console.log('Correct!')
      this.remakeMode()
    } else {
      this.incorrectlySelected[index] = true
    }
  }

  ngOnInit() {
    this.remakeMode()
  }

  remakeMode() {
    [this.translateFrom, this.translateTo] = randomElements(modes, 2)
    this.fourRandomPhrases = randomElements(words, 4) as [Phrase, Phrase, Phrase, Phrase]
    this.randomCorrectIndex = Math.floor(Math.random() * 4)
    this.incorrectlySelected = [false, false, false, false]
  }

  computeStyle(i: number): {"background-color": "red"} | {} {
    return this.incorrectlySelected[i] ? {"background-color": "red"} : {}
  }
}


const words: Phrase[] = [{
  english: 'My name is Brett',
  khmer: 'ខ្ញុំឈ្មោះប្រែត',
  ipa: 'kɲom cʰmŭəh preːt'
}, {
  english: 'No thanks, sir',
  khmer: 'អត់ទេបង',
  ipa: 'ʔɑt tei ɓɑːŋ'
}, {
  english: 'How are you?',
  khmer: 'សុខសប្បាយជាទេ?',
  ipa: 'sok sap.ˈɓaːj ciə tei'
}, {
  english: 'fisherman',
  khmer: 'អ្នកនេសាទ',
  ipa: 'nĕəʔ neː.ˈsaːt'
}, {
  english: 'phone',
  khmer: 'ទូរស័ព្ទ',
  ipa: 'tuː.rĕəʔ.sap'
}, {
  english: 'Give me back my phone',
  khmer: 'ឲ្យទូរស័ព្ទមកខ្ញុំវិញ',
  ipa: 'ʔaoj tuː.rĕəʔ.sap mɔːʔ kɲom ʋɨɲ'
}, {
  english: 'I will try to find another way if it\'s possible',
  khmer: 'ខ្ញុំនឹងព្យាយាមរកវិធីផ្សេងបើសិនជាអាច',
  ipa: 'kɲom nɨŋ pjiəjiəm rɔːʔ ʋi.ˈtʰiː pʰseːŋ ɓaə sən ciə ʔaːc'
}, {
  english: 'if it\'s possible',
  khmer: 'បើសិនជាអាច',
  ipa: 'ɓaə sən ciə ʔaːc'
}, {
  english: 'I need a roof to protect it from the rain',
  khmer: 'ខ្ញុំត្រូវការធ្វើដំបូលអោយហើយដើម្បីការពារភ្លៀង',
  ipa: 'kɲom trəw kaː tʰʋəː ɗɑm.ˈɓoul ʔaoj haəj ɗaəm.ˈɓəj kaː.ˈpiə pʰliəŋ'
}, {
  english: 'Anything else, I will think of later',
  khmer: 'អ្វីផ្សេងខ្ញុំនឹងគិតពេលក្រោយ',
  ipa: 'ʔaʔ.ˈʋəj pʰseːŋ kɲom nɨŋ kɨt peːl kraoj'
}, {
  english: 'Why are you laughing at me',
  khmer: 'ហេតុអ្វីបានជាអ្នកសើចខ្ញុំ',
  ipa: 'haet ʔaʔ.ˈʋəj ɓaːn ciə nĕəʔ saəc kɲom'
}]

type Phrase = {
  english: string,
  khmer: string,
  ipa: string
}

type Mode = 'ipa' | 'english' | 'khmer'

const modes: Mode[] = ['ipa', 'english', 'khmer']

function randomElements<T>(array: T[], n: number): T[] {
  let result = new Array<T>(n)
  let len = array.length
  let taken = new Array<number>(len)

  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available")
  }

  while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = array[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
}