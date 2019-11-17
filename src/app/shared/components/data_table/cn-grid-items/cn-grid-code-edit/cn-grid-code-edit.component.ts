import { Component, OnInit, ViewChild, Input, EventEmitter, ElementRef, Output, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { _HttpClient } from '@delon/theme';
declare let CodeMirror: any;
@Component({
  selector: 'app-cn-grid-code-edit',
  templateUrl: './cn-grid-code-edit.component.html',
  encapsulation: ViewEncapsulation.Native,
  styleUrls: ['./cn-grid-code-edit.component.less']
})
export class CnGridCodeEditComponent implements OnInit,AfterViewInit {

  @ViewChild('CodeMirror', { static: true }) codeEditor: ElementRef;
  @Input() public config;
  @Output() public updateValue = new EventEmitter();
  value = null;
  _value = null;
  isSpinning = true;
  editor;
  divstyle={width:'100%',height:'330px'};
  constructor(
    private http: _HttpClient
  ) { }

  ngOnInit() {
   if( this.config.height){
   this. divstyle.height = this.interpret( this.config.height);
   }
  }
   interpret(val) {
    return typeof val === "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
  }

  /**
   * text/x-sql
   * text/x-markdown
   * application/json
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.editor = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
        mode: this.config.mode,
        readOnly: this.config.readOnly,
        styleActiveLine:true,
        highlightFormatting: true,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        autofocus: this.config.autofocus,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        hintOptions: {
          tables: {
            users: { name: null, score: null, birthDate: null },
            countries: { name: null, population: null, size: null }
          }
        }
      });
      if(this.config.height){
        this.editor.setSize(null,this.config.height);
      }
      this.isSpinning = false;
  
      // this.editor.on("cursorActivity",  () =>{
      //   // 调用显示提示
      //  console.log('cursorActivity');
      // });
      this.editor.on("blur", () => {
        // 调用显示提示
        // console.log('blur',this.getValue());
        this.onblur();
      });
  
      this.setValue(this._value);
    });

  }


  public getValue() {
    if( this.editor){
      return this.editor.getValue();
    } else {
      return this._value;
    }

  }

  public setValue(data?) {
    if(!data) 
    data="";
    if( this.editor)
    this.editor.setValue(data);
  }


  public valueChange(v?) {

   // console.log('sql', v);
    if (v) {
      if (v !== this._value) {
        this._value = v;
          this.setValue(this._value);
      }
    } else {
      this._value = "";
      this.setValue(this._value);
    }
    const backValue = { name: this.config.field, value: v, id: this.config.config.id };
    this.updateValue.emit(backValue);
  }

  public cascadeAnalysis(c?) {
  }
  public onblur(e?, type?) {
    this.assemblyValue();

  }
  public onKeyPress(e?, type?) {
    if (e.code === 'Enter') {
      this.assemblyValue();
    }
  }

  // 组装值
  public assemblyValue() {
    this._value = this.getValue();
  //  console.log('组装值', this._value);
    this.value = this._value;
    //  this.valueChange( this._value );
  }

}