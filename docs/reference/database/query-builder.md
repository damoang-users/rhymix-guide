# XML 쿼리 빌더

::: danger
🚧 이 문서는 초안을 작성중인 문서이다.
:::

## Schema
라이믹스에서는 DB 스키마를 생성할 때 XML을 활용한다.  
XML 파일의 위치는 아래와 같다.

- modules/`모듈이름`/schemas/`스키마명`.xml
  - `접두사`+`스키마명` 테이블 생성 (ex. `rx_documents`)

### 기본 구조
```xml
<table name="documents">
    <column name="document_srl" type="number" primary-key="primary-key" />
    <column name="module_srl" type="number" size="11" default="0" notnull="notnull" index="idx_module_srl" />
    <column name="is_notice" type="char" size="1" default="N" notnull="notnull" index="idx_is_notice" />
    <column name="title" type="varchar" size="250" />
    <column name="content" type="bigtext" notnull="notnull" />
    <column name="readed_count" type="number" size="11" default="0" notnull="notnull" index="idx_readed_count" />
    <column name="list_order" type="number" size="11" notnull="notnull" index="idx_list_order" />
    <column name="regdate" type="\date" index="idx_regdate" />
    <column name="status" type="varchar" size="20" default="PUBLIC" />

    ...
    <index name="idx_module_list_order" columns="module,list_order" type="unique" />
    <index name="idx_module_regdate" columns="module,regdate" />
</table>
```

::: tip 테이블 이름의 `prefix`는 생략
라이믹스가 사용하는 테이블 이름 앞에 붙는 `prefix`(보통 `rx_`)는 질의문을 자동으로 고쳐서 붙여주므로 테이블 이름에는 `prefix`를 붙이지 않아야 한다.
:::
- `table` : 테이블을 생성할 때 사용한다.
  - `name` : 테이블 이름

- `column` : 테이블의 컬럼을 생성할 때 사용한다.
  - `name` : 컬럼 이름
  - `type` : 컬럼의 타입이다. 기본적으로 MySQL의 타입을 따라간다.
    - `number` : 숫자형
    - `char` : 문자형. size 필수.
    - `varchar` : 가변 문자형. size 필수.
    - `bigtext` : 긴 문자형
    - `date` : char(14)와 동일.
    - `\date` : MySQL 날짜형
  - `primary-key` : 기본키 설정 (primary-key)
  - `notnull` : NOT NULL 설정 (notnull)
  - `default` : 기본값 설정 (default)
  - `size` : 크기 설정 (size)
  - `index` : 인덱스 설정 (index). 복합 인덱스의 경우 아래 서술.
  - `auto-increment` : 자동 증가 설정 (auto-increment)

- `index` : 인덱스를 생성할 때 사용한다.
  - `name` : 인덱스 이름
  - `columns` : 인덱스에 포함될 컬럼. 복합 인덱스의 경우 `,`로 구분한다.
  - `type` : 인덱스 타입. 기본적으로 `normal`이다.
    - `unique` : 유니크 인덱스
    - `fulltext` : 풀텍스트 인덱스
    - `spatial` : 공간 인덱스
  - `options` : 인덱스 옵션이다. 예를 들어 `options="with parser ngram"`와 같이 사용한다.

::: warning
실제 지원여부는 DB 버전에 따라 다를 수 있으니 유의하여야한다.
:::

### 제약 조건
```xml
<table name="mytable">
    .... 중략 ...
    <constraint type="foreign key" column="document_srl" references="documents.document_srl" onupdate="cascade" ondelete="cascade" />
    <constraint type="check" condition="voted_count > blamed_count" />
</table>
```
위와 같이 FK, 제약 조건을 설정할 수 있으며, 조건에 맞지 않는 데이터를 INSERT 또는 UPDATE하면 오류가 발생하게 된다.


## Query
라이믹스에서는 쿼리를 실행할때 XML 쿼리를 활용하는 것을 권장한다.  
XML 파일의 위치는 아래와 같다.

- `모듈이름.쿼리ID`
  - modules/`모듈이름`/queries/`쿼리ID`.xml
- `widget.위젯이름.쿼리ID`
  - widgets/`위젯이름`/queries/`쿼리ID`.xml
- `addon.애드온이름.쿼리ID`
  - addons/`애드온이름`/queries/`쿼리ID`.xml

## 쿼리 실행 방법
라이믹스에서 쿼리를 실행할 때는 `executeQuery` 혹은 `executeQueryArray` 함수를 사용한다.
```php
// executeQueryArray('모듈이름.쿼리ID', [ '파라미터명' => '값', ... ]);
$my_array = executeQueryArray('모듈이름.쿼리ID', 
    [
        'document_srl' => $document_srl,
        'module_srl' => $module_srl,
    ],
);
```

### SELECT 쿼리
```xml
<query id="getDocumentList" action="select">
    <tables>
        <table name="documents" />
    </tables>
    <columns>
        <column name="*" />
    </columns>
    <conditions>
        <condition operation="equal" column="module_srl" var="module_srl" filter="number" />
    </conditions>
    <navigation>
        <list_count var="list_count" default="20" />
    </navigation>
</query>
```

#### 연산자
`<condition>` 요소의 operation 속성은 조건의 연산자를 뜻한다.  
자세한 내용은 [DB 쿼리 operator](https://rhymix.org/manual/plugin/dbquery/operation) 공식 문서를 참고하여 확인할 수 있다.

### INSERT 쿼리
```xml
<query id="insertDocument" action="insert">
    <tables>
        <table name="documents" />
    </tables>
    <columns>
        <column name="document_srl" var="document_srl" />
        <column name="module_srl" var="module_srl" notnull="notnull" />
        <column name="is_notice" var="is_notice" notnull="notnull" />
        <column name="title" var="title" />
        <column name="content" var="content" notnull="notnull" />
        <column name="readed_count" var="readed_count" notnull="notnull" />
        <column name="list_order" var="list_order" notnull="notnull" />
        <column name="regdate" var="regdate" default="curdate()" />
        <column name="status" var="status" />
    </columns>
</query>
```

### UPDATE 쿼리
```xml
<query id="updateDocument" action="update">
    <tables>
        <table name="documents" />
    </tables>
    <columns>
        <column name="document_srl" var="document_srl" />
        <column name="module_srl" var="module_srl" />
        <column name="is_notice" var="is_notice" />
        <column name="title" var="title" />
        <column name="content" var="content" />
        <column name="readed_count" var="readed_count" />
        <column name="list_order" var="list_order" />
        <column name="regdate" var="regdate" />
        <column name="status" var="status" />
    </columns>
    <conditions>
        <condition operation="equal" column="document_srl" var="document_srl" filter="number" notnull="notnull" />
    </conditions>
</query>

```
::: tip `executeQuery`시에 파라메터에 없는 key는 무시됨
쿼리 실행시에 파라메터에 넣지않은 key는 변경되지 않는다.  
예를 들어 `title`을 매개변수 부분에 넣지 않으면 `title`은 변경되지 않는다.
:::

### DELETE 쿼리
```xml
<query id="deleteDocument" action="delete">
    <tables>
        <table name="documents" />
    </tables>
    <conditions>
            <condition operation="equal" column="document_srl" var="document_srl" filter="number" notnull="notnull" />
    </conditions>
</query>
```

### 참고 문서
XML 쿼리 빌더에 대한 자세한 내용은 아래 링크를 통해 확인할 수 있다.  
[(고급) DB 접속 방법 변경 및 XML 문법 확장](https://github.com/rhymix/rhymix/pull/1332)  
[쿼리 자동 생성기](https://tools.hoshi.no/)
